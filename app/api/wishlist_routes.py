from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews,WishList
from app.models import db
from app.forms import WishListForm
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


wishlist_routes = Blueprint('wishlist', __name__)


db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()

@wishlist_routes.route('/all')
@login_required
def wishlist():
    wishlist = WishList.query.filter(WishList.user_id == current_user.id)
    return [wish.to_dict() for wish in wishlist]

@wishlist_routes.route('/add/<int:gameId>', methods=['POST'])
@login_required
def wishlist_add(gameId):
    form = WishListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = WishList(
            user_id = current_user.id,
            game_id = gameId
        )
        db.session.add(game)
        db.session.commit()
        return game.to_dict()
    return {'errors': 'error'}, 401

@wishlist_routes.route('/delete/<int:gameId>', methods=['GET','POST','DELETE'])
@login_required
def wishlist_remove(gameId):
    gameId = int(gameId)
    game = WishList.query.filter(WishList.game_id == gameId).first()
    db.session.delete(game)
    db.session.commit()
    return {'deleted':f'{gameId}'}
