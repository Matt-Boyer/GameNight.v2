from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews
from app.models import db
from app.forms import ReviewForm
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


reviews_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reviews_routes.route('/edit/<int:gameId>', methods=['GET','POST','PUT'])
@login_required
def edit_review(gameId):
    form = ReviewForm()
    review = Reviews.query.filter(Reviews.user_id == current_user.id, Reviews.game_id == gameId).first()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.user_id = current_user.id
        review.game_id = gameId
        review.content = form.data['content']
        review.stars = form.data['stars']
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reviews_routes.route('/single/<int:gameId>')
@login_required
def single_review(gameId):
    review = Reviews.query.filter(Reviews.user_id == current_user.id, Reviews.game_id == gameId).first()
    if review == None:
        return {"Message":"Review does not exist"}
    return review.to_dict()

@reviews_routes.route('/<int:gameId>')
def reviews(gameId):
    reviews = Reviews.query.filter(Reviews.game_id == gameId)
    return [review.to_dict() for review in reviews]
