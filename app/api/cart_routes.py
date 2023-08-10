from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews
from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


cart_routes = Blueprint('cart', __name__)


db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()


@cart_routes.route('/all')
@login_required
def cart():
    cart = Cart.query.filter(Cart.user_id == current_user.id)
    return [items.to_dict() for items in cart]
