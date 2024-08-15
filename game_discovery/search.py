from flask import Blueprint, url_for, render_template, request

search = Blueprint("search", __name__)


@search.route("/search")
def home():

    data = request.args.get("search", None, type=str)
    return render_template("base.html"
                           , tittle=f"Search results for { data.capitalize() }"
                           , page="search"
                           , this_js=url_for("static", filename="js/search.js")
                           , dataS=data)
