from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm


notes_routes = Blueprint('notes', __name__)

@notes_routes.route('/all')
@login_required
def get_all_notes():
    # print('YOU HIT THE ROUTE!!!')
    my_id = current_user.to_dict()
    # print('BBBBBBBB', my_id['id'])
    all_notes = Note.query.filter(Note.user_id == my_id['id']).all()
    all_notes_arr = [note.to_dict() for note in all_notes]
    # print('CCCCCCCC', all_notes_arr)

    # print('AAAAAAAAAAAA', all_notes)
    return all_notes_arr

@notes_routes.route('/<int:id>')
@login_required
def get_one_note(id):
    note = Note.query.get(id)
    return note.to_dict()


@notes_routes.route('/new', methods=['POST'])
@login_required
def create_note():
    print("IM IN THE POST ROUTE")
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('FORMMMMMMMMMMMM', form.data)
    if form.validate_on_submit():
        note = Note(
            user_id=current_user.id,
            note_title=form.data['note_title'],
            note_content=form.data['note_content'],
        )
        print('NEW NOTEEEEE', note)
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {}


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
    return {}


@notes_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return {}


@notes_routes.route('/<int:noteId>/notebooks/<int:notebookId>/add-note', methods=['PUT'])
@login_required
def add_note_to_notebook(noteId, notebookId):
    print('NOTEID', noteId)
    print('NOTEBOOKID', notebookId)

    to_update_note = Note.query.get(noteId)
    print('TO UPDATE NOTE', to_update_note.to_dict())

    to_update_note.notebook_id = notebookId

    db.session.commit()

    return to_update_note.to_dict()

@notes_routes.route('/<int:noteId>/notebooks/<int:notebookId>/edit', methods=['PUT'])
@login_required
def edit_note_to_notebook(noteId, notebookId):
    print('NOTEID', noteId)
    print('NOTEBOOKID', notebookId)

    to_update_note = Note.query.get(noteId)
    print('TO UPDATE NOTE', to_update_note.to_dict())

    to_update_note.notebook_id = notebookId

    db.session.commit()

    return to_update_note.to_dict()

@notes_routes.route('/<int:noteId>/delete', methods=['PUT'])
@login_required
def delete_note_to_notebook(noteId):
    print('NOTEID', noteId)

    to_update_note = Note.query.get(noteId)
    print('TO UPDATE NOTE', to_update_note.to_dict())

    to_update_note.notebook_id = None

    db.session.commit()

    return to_update_note.to_dict()
