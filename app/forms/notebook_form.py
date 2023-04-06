from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class NotebookForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(message='Title is required.')])
