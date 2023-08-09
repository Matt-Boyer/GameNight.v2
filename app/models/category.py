from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Category(db.Model, UserMixin):
    __tablename__ = 'category'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    games = db.relationship(
        "Games",
        back_populates="category"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'games': [game.to_dict() for game in self.games]
        }
