from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm


notes_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@notes_routes.route('/all')
@login_required
def get_all_notes():
    """Returns all notes made by that current user"""

    my_id = current_user.to_dict()

    all_notes = Note.query.filter(Note.user_id == my_id['id']).all()
    all_notes_arr = [note.to_dict() for note in all_notes]



    return all_notes_arr

@notes_routes.route('/<int:id>')
@login_required
def get_one_note(id):
    """Returns the note queried that matches the id in the params"""
    note = Note.query.get(id)

    return note.to_dict()


@notes_routes.route('/new', methods=['POST'])
@login_required
def create_note():
    """Creates note"""

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note = Note(
            user_id=current_user.id,
            note_title=form.data['note_title'],
            note_content=form.data['note_content'],
        )

        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@notes_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_note(id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        to_update_note = Note.query.get(id)

        to_update_note.user_id = current_user.id
        to_update_note.note_title = form.data['note_title']
        to_update_note.note_content = form.data['note_content']

        db.session.commit()
        return to_update_note.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@notes_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return note.to_dict()


@notes_routes.route('/<int:noteId>/notebooks/<int:notebookId>/add-note', methods=['PUT'])
@login_required
def add_note_to_notebook(noteId, notebookId):

    to_update_note = Note.query.get(noteId)

    to_update_note.notebook_id = notebookId

    db.session.commit()

    return to_update_note.to_dict()

@notes_routes.route('/<int:noteId>/notebooks/<int:notebookId>/edit', methods=['PUT'])
@login_required
def edit_note_to_notebook(noteId, notebookId):

    to_update_note = Note.query.get(noteId)

    to_update_note.notebook_id = notebookId

    db.session.commit()

    return to_update_note.to_dict()

@notes_routes.route('/<int:noteId>/delete', methods=['PUT'])
@login_required
def delete_note_to_notebook(noteId):

    to_update_note = Note.query.get(noteId)

    to_update_note.notebook_id = None

    db.session.commit()

    return to_update_note.to_dict()
