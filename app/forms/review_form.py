from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id')
    game_id = IntegerField('game Id')
    content = StringField('content')
    stars = IntegerField('stars')
    created_at = StringField('created at')
