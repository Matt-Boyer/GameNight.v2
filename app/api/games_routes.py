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

@games_routes.route('/method/<int:methodId>/category/<int:categoryId>')
def filtered_games():
    games = Games.query.filter()
    return [game.to_dict() for game in games]
