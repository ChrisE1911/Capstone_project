from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class NoteForm(FlaskForm):
    note_title = StringField('Title...', validators=[DataRequired(message='Note title is required')])
    note_content = StringField('Write Away', validators=[DataRequired(message='Note content is required.')])
