from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

def min_length(form, field):
    content=field.data
    if len(content) < 5 :
        raise ValidationError("Review must be at least 5 characters long.")

def max_length(form, field):
    content=field.data
    if len(content) > 500 :
        raise ValidationError("Review can NOT be longer 500 characters.")

def stars_length(form, field):
    stars=field.data
    if stars < 1 :
        raise ValidationError("Select number of stars for review.")

class ReviewForm(FlaskForm):
    user_id = IntegerField('User Id')
    game_id = IntegerField('game Id')
    content = StringField('content',validators=[ min_length, max_length])
    stars = IntegerField('stars',validators=[stars_length])
    created_at = StringField('created at')
