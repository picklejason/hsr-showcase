from flask import Flask, render_template, request
import requests

app = Flask(__name__)
# app.config["TEMPLATES_AUTO_RELOAD"] = True
asset_url = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/"


class DataStore:
    a = None


d = DataStore()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/profile", methods=["GET"])
def profile():
    uid = request.args.get("uid")
    url = f"https://api.mihomo.me/sr_info_parsed/{uid}?lang=en&version=v1"
    res = requests.get(url)
    data = res.json()
    d.a = data

    url2 = f"https://api.mihomo.me/sr_info_parsed/{uid}?lang=en"
    res2 = requests.get(url2)
    data2 = res2.json()

    return render_template("profile.html", data=data, data2=data2, asset_url=asset_url)


@app.route("/character")
def character():
    uid = d.a["player"]["uid"]
    name = d.a["player"]["name"]
    data = d.a["characters"]
    chara = int(request.args.get("chara"))

    return render_template(
        "character.html",
        uid=uid,
        name=name,
        data=data,
        chara=chara,
        asset_url=asset_url,
    )


if __name__ == "__main__":
    app.run()
