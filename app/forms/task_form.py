from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, BooleanField
from wtforms.validators import DataRequired, Length
from app.models import User


class TaskForm(FlaskForm):
    task_content = StringField('Task?', validators=[DataRequired(message='Task Content is required')])
    is_completed = BooleanField()
