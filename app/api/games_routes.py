from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Cart,Category,Games,Method,Reviews
from app.models import db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


games_routes = Blueprint('games', __name__)


db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()

@games_routes.route('/filtered')
def filtered_games():
    method = request.headers.get('Method').split(',')
    method = [int(game) for game in method]
    category = request.headers.get('Category').split(',')
    category = [int(game) for game in category]
    games = Games.query.filter(Games.category_id.in_(category), Games.method_id.in_(method)).all()
    return [game.to_dict() for game in games]

@games_routes.route('/<int:gameId>')
def single_game(gameId):
   game = Games.query.get(gameId)
   return game.to_dict()
