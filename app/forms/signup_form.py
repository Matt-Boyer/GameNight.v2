from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def is_valid(form, field):
    el = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(el, email):
        raise ValidationError('Invalid email address.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def max_length(form, field):
    email=field.data
    if len(email) > 100 :
        raise ValidationError("Email can NOT be longer 100 characters.")

def max_length_username(form, field):
    username=field.data
    if len(username) > 12 :
        raise ValidationError("Username can NOT be longer 12 characters.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def max_length_password(form, field):
    password=field.data
    if len(password) > 100 :
        raise ValidationError("Password can NOT be longer 100 characters.")

def min_length_password(form, field):
    password=field.data
    if len(password) < 7 :
        raise ValidationError("Password must be at LEAST 8 characters.")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,max_length_username])
    email = StringField('email', validators=[DataRequired(), user_exists, is_valid,max_length,min_length_password])
    password = StringField('password', validators=[DataRequired(),max_length_password])
