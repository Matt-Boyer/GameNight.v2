from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Games(db.Model, UserMixin):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('category.id')), nullable=False)
    method_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('method.id')), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    max_players = db.Column(db.Integer, nullable=False)
    min_players = db.Column(db.Integer, nullable=False)
    min_age = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(precision=5, scale=2), nullable=False)
    image = db.Column(db.Text, nullable=True)

    reviews = db.relationship(
        "Reviews",
        cascade="all, delete-orphan",
        back_populates="games"
    )

    cart = db.relationship(
        "Cart",
        cascade="all, delete-orphan",
        back_populates="games"
    )

    method = db.relationship(
            "Method",
            back_populates="games"
    )

    category = db.relationship(
            "Category",
            back_populates="games"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'method_id': self.method_id,
            'name' : self.name,
            'max_players': self.max_players,
            'min_players': self.min_players,
            'min_age': self.min_age,
            'price': self.price,
            'image' : self.image,
            'avg_stars': 0,
            'reviews': [review.to_dict() for review in self.reviews]
        }
