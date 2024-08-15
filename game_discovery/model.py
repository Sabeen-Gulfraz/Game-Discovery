from flask import session

from .extns import db


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def save_to_database(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_database(self):
        db.session.delete(self)
        db.session.commit()

    def add_to_session(self):
        session['user_id'] = self.id

    def __repr__(self):
        return f"<user: {self.email}>"

