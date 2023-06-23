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

    return render_template("profile.html", data=data, asset_url=asset_url)


@app.route("/character")
def character():
    uid = d.a["player"]["uid"]
    data = d.a["characters"]
    chara = int(request.args.get("chara"))

    return render_template(
        "character.html",
        uid=uid,
        data=data,
        chara=chara,
        asset_url=asset_url,
    )


if __name__ == "__main__":
    app.run()
