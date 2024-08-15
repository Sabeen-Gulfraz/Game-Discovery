from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from game_discovery.model import User

auth = Blueprint("auth", __name__)


@auth.route("/", methods=['GET', 'POST'])
@auth.route("/login", methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for("content.home"))

    if request.method == "POST":
        data = request.form.to_dict(flat=True)

        user = User.query.filter(User.email == data['email']).first()

        if not user:
            flash("Invalid Email Address")
            return redirect(url_for("auth.login"))
        if user.password != data['password']:
            flash("Invalid Password")
            return redirect(url_for("auth.login"))

        if user.password == data['password']:
            user.add_to_session()
            return redirect(url_for("content.home"))

    return render_template("login.html")


@auth.route("/signup", methods=['GET', 'POST'])
def signup():
    if 'user_id' in session:
        return redirect(url_for("content.home"))

    if request.method == "POST":
        data = request.form.to_dict(flat=True)

        if User.query.filter(User.email == data['email']).first():
            flash("Email Already exist, Please try another email address")
            return redirect(url_for("auth.signup"))

        user = User(email=data['email']
                    , password=data['password'])

        user.save_to_database()
        user.add_to_session()
        return redirect(url_for("content.home"))

    return render_template("signup.html")


@auth.route("/logout")
def logout():
    if "user_id" in session:
        session.pop("user_id")

        return redirect(url_for("auth.login"))

    return redirect(url_for("content.home"))

