from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Reviews(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.Date)

    users = db.relationship(
        "User",
        back_populates="reviews"
    )

    games = db.relationship(
        "Games",
        back_populates="reviews"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            'content': self.content,
            'stars':self.stars
        }
