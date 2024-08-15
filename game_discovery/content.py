from flask import Blueprint, url_for, render_template, request

content = Blueprint("content", __name__)


@content.route("/home")
@content.route("/all_games")
def home():
    return render_template("base.html"
                           , tittle="All Games"
                           , page="home"
                           , this_js=url_for("static", filename="js/all_games.js"))


@content.route("/new_releases")
def new():
    return render_template("base.html"
                           , tittle="New Released Games"
                           , page="new_release"
                           , this_js=url_for("static", filename="js/new_releases.js"))


@content.route("/popular")
def popular():
    return render_template("base.html"
                           , tittle="Popular Games"
                           , page="popular"
                           , this_js=url_for("static", filename="js/popular.js"))


@content.route("/categories")
def categories():
    return render_template("categories.html"
                           , tittle="Categories of Games"
                           , page="categories"
                           , this_js=url_for("static", filename="js/categories.js"))


@content.route("/category/<name>")
def category(name):
    return render_template("base.html"
                           , tittle=name + " Play"
                           , page="category"
                           , this_js=url_for("static", filename="js/one_category.js")
                           , categoryName=name)


@content.route("/favorites")
def favorites():
    return render_template("favorite.html"
                           , tittle="My Favorite Games"
                           , page="favorites")




