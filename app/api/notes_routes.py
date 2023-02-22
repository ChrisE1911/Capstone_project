from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm


notes_routes = Blueprint('notes', __name__)

@notes_routes.route('/all')
@login_required
def get_all_notes():
    print('YOU HIT THE ROUTE!!!')
    my_id = current_user.to_dict()
    # print('BBBBBBBB', my_id['id'])
    all_notes = Note.query.filter(Note.user_id == my_id['id']).all()
    all_notes_arr = [note.to_dict() for note in all_notes]
    print('CCCCCCCC', all_notes_arr)

    print('AAAAAAAAAAAA', all_notes)
    return all_notes_arr


@notes_routes.route('/new', methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_note = Note(
            user_id = current_user.id,
            note_title=form.data['note_title'],
            note_content=form.data['note_content'],
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()
