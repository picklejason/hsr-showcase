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
@cache.cached(query_string=True)
def index():
    return render_template("index.html")


@app.route("/profile", methods=["GET"])
@cache.cached(query_string=True)
def profile():
    uid = request.args.get("uid")
    data = get_data(uid)
    cache.set(uid, data)

    return render_template("profile.html", data=data, asset_url=asset_url)


@app.route("/character")
@cache.cached(query_string=True)
def character():
    uid = request.args.get("uid")
    chara = int(request.args.get("chara"))

    if cache.has(uid):
        data = cache.get(uid)
    else:
        data = get_data(uid)
        cache.set(uid, data)

    return render_template(
        "character.html",
        data=data,
        chara=chara,
        asset_url=asset_url,
    )


@app.errorhandler(500)
@cache.cached(query_string=True)
def internal_error(error):
    msg = "Something went wrong. Please try again."
    return render_template("error.html", msg=msg)


def get_data(uid):
    url = f"https://api.mihomo.me/sr_info_parsed/{uid}?lang=en"
    res = requests.get(url)
    data = res.json()
    for character in data["characters"]:
        properties = []
        for attr in character["attributes"]:
            for add in character["additions"]:
                if attr["name"] == add["name"]:
                    d = {}
                    d["name"] = attr["name"]
                    if add["percent"]:
                        d[
                            "display"
                        ] = f'{(float(attr["display"].strip("%"))) + float(add["display"].strip("%"))}%'
                    else:
                        d["display"] = int(float(attr["display"])) + int(
                            float(add["display"])
                        )
                    d["icon"] = add["icon"]
                    properties.append(d)

            if attr["name"] not in d["name"]:
                d = {}
                d["name"] = attr["name"]
                d["display"] = attr["display"]
                d["icon"] = add["icon"]
                properties.append(d)

        for add in character["additions"]:
            if add["name"] not in ["ATK", "HP", "DEF", "SPD", "CRIT DMG", "CRIT Rate"]:
                d = {}
                d["name"] = add["name"]
                d["display"] = add["display"]
                d["icon"] = add["icon"]
                properties.append(d)

        for i in range(len(character["relic_sets"]) - 1):
            if (
                character["relic_sets"][i]["name"]
                == character["relic_sets"][i + 1]["name"]
            ):
                del character["relic_sets"][i]
                break

        character.update({"property": properties})
    return data


if __name__ == "__main__":
    app.run()
