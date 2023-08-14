from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews
from app.models import db
from app.forms import CartForm
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

@cart_routes.route('/add/<int:gameId>', methods=['POST'])
@login_required
def add_to_cart(gameId):
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Cart(
            user_id = current_user.id,
            game_id = gameId,
            quantity = form.data['quantity']
        )
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {'errors': 'error'}, 401

@cart_routes.route('/edit/<int:gameId>', methods=['GET','POST','PUT'])
@login_required
def edit_review(gameId):
    form = CartForm()
    item = Cart.query.filter(Cart.game_id == gameId).first()
    print('--------------------------------------------',item)
    form['csrf_token'].data = request.cookies['csrf_token']
    item.user_id = current_user.id
    item.game_id = gameId
    item.quantity = form.data['quantity']
    if int(form.data['quantity']) < 1:
        db.session.delete(item)
        db.session.commit()
        return {'message':'removed from cart'}
    db.session.commit()
    return item.to_dict()
