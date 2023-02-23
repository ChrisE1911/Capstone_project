from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class NoteForm(FlaskForm):
    user_id = IntegerField('User ID')
    notebook_id = IntegerField('Notebook ID')
    note_title = StringField('Title...', validators=[DataRequired()])
    note_content = StringField('Write Away', validators=[DataRequired()])
