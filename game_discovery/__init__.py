from flask import Flask

from .extns import db

from .auth import auth
from .content import content
from .search import search


def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = "abc123"

    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root@localhost/game_discovery"

    # BLUEPRINT REGISTRATION
    app.register_blueprint(auth)
    app.register_blueprint(content)
    app.register_blueprint(search)

    db.init_app(app)

    return app
