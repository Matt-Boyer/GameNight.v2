from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class CartForm(FlaskForm):
    user_id = IntegerField('user_id')
    game_id = IntegerField('game_id')
    quantity = IntegerField('quantity')
    created_at = StringField('created_at')
