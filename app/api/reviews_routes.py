from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews
from app.models import db
from app.forms import ReviewForm
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


reviews_routes = Blueprint('reviews', __name__)


db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()


@reviews_routes.route("/delete/<int:gameId>", methods=['GET','POST','DELETE'])
@login_required
def delete_review(gameId):
  review = Reviews.query.filter(Reviews.user_id == current_user.id, Reviews.game_id == gameId).first()
  db.session.delete(review)
  db.session.commit()
  return {'message':'deleted'}

@reviews_routes.route('/new/<int:gameId>', methods=['POST'])
@login_required
def create_review(gameId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Reviews(
            user_id = current_user.id,
            game_id = gameId,
            content = form.data['content'],
            stars = form.data['stars']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@reviews_routes.route('/edit/<int:gameId>', methods=['GET','POST','PUT'])
@login_required
def edit_review(gameId):
    form = ReviewForm()
    review = Reviews.query.filter(Reviews.user_id == current_user.id, Reviews.game_id == gameId).first()
    form['csrf_token'].data = request.cookies['csrf_token']
    review.user_id = current_user.id
    review.game_id = gameId
    review.content = form.data['content']
    review.stars = 0
    db.session.commit()
    return review.to_dict()

@reviews_routes.route('/single/<int:gameId>')
@login_required
def single_review(gameId):
    review = Reviews.query.filter(Reviews.user_id == current_user.id, Reviews.game_id == gameId).first()
    return review.to_dict()

@reviews_routes.route('/<int:gameId>')
def reviews(gameId):
    reviews = Reviews.query.filter(Reviews.game_id == gameId)
    return [review.to_dict() for review in reviews]
