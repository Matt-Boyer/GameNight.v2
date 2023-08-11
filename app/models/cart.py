from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Cart(db.Model, UserMixin):
    __tablename__ = 'cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.Date)

    users = db.relationship(
        "User",
        back_populates="cart"
    )

    games = db.relationship(
        "Games",
        back_populates="cart"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'games': self.games.to_dict()
        }
