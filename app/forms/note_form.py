from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    note_title = StringField('Title...', validators=[DataRequired()])
    note_content = StringField('Write Away', validators=[DataRequired()])
