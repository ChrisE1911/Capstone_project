from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Note


notes_routes = Blueprint('notes', __name__)

@notes_routes.route('/all')
# @login_required
def get_all_notes():
    print('YOU HIT THE ROUTE!!!')
    my_id = current_user.to_dict()
    # print('BBBBBBBB', my_id['id'])
    all_notes = Note.query.filter(Note.user_id == my_id['id']).all()
    all_notes_arr = [note.to_dict() for note in all_notes]
    print('CCCCCCCC', all_notes_arr)

    print('AAAAAAAAAAAA', all_notes)
    return all_notes_arr
