from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class WishListForm(FlaskForm):
    user_id = IntegerField('user_id')
    game_id = IntegerField('game_id')
