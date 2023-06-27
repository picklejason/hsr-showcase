from flask import Flask, render_template, request
from flask_caching import Cache
import requests
import os

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
asset_url = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/"
cache = Cache(
    app,
    config={
        "CACHE_TYPE": "SimpleCache",
        "CACHE_DEFAULT_TIMEOUT": 300,
        "CACHE_THRESHOLD": 1000,
    },
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/profile", methods=["GET"])
@cache.cached(query_string=True)
def profile():
    uid = request.args.get("uid")
    data = get_data(uid)
    cache.set("data_" + uid, data)
    data2 = get_data2(uid)
    cache.set("data2_" + uid, data2)

    return render_template("profile.html", data=data, asset_url=asset_url)


@app.route("/character")
@cache.cached(query_string=True)
def character():
    uid = request.args.get("uid")
    chara = int(request.args.get("chara"))

    if cache.has("data_" + uid):
        data = cache.get("data_" + uid)
    else:
        data = get_data(uid)
        cache.set("data_" + uid, data)

    if cache.has("data2_" + uid):
        data2 = cache.get("data2_" + uid)
    else:
        data2 = get_data2(uid)
        cache.set("data2_" + uid, data2)

    return render_template(
        "character.html",
        data=data,
        data2=data2,
        chara=chara,
        asset_url=asset_url,
    )


@app.errorhandler(500)
def internal_error(error):
    msg = "Something went wrong. Please try again."
    return render_template("error.html", msg=msg)


def get_data(uid):
    url = f"https://api.mihomo.me/sr_info_parsed/{uid}?lang=en"
    res = requests.get(url)
    data = res.json()
    return data


def get_data2(uid):
    url = f"https://api.mihomo.me/sr_info_parsed/{uid}?lang=en&version=v1"
    res = requests.get(url)
    data = res.json()
    return data


if __name__ == "__main__":
    app.run()
