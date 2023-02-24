from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms import NotebookForm

notebooks_routes = Blueprint('notebooks', __name__)



@notebooks_routes.route('/all')
@login_required
def get_all_notebooks():
    my_id = current_user.to_dict()

    all_notebooks = Notebook.query.filter(Notebook.user_id == my_id['id']).all()
    all_notebooks_arr = [notebook.to_dict() for notebook in all_notebooks]

    # print('AAAAAAAA', all_notebooks)
    return all_notebooks_arr


@notebooks_routes.route('/<int:id>')
@login_required
def get_one_notebook(id):
    notebook = Notebook.query.get(id)
    return notebook.to_dict()

@notebooks_routes.route('/new', methods=['POST'])
@login_required
def create_notebook():
    print("IM IN THE POST ROUTE")
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('FORMMMMMMMMMMMM', form.data)
    if form.validate_on_submit():
        notebook = Notebook(
            user_id=current_user.id,
            name=form.data['name'],
        )
        print('NEW NOTEEEEE', notebook)
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {}


@notebooks_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_notebook(id):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        to_update_notebook = Notebook.query.get(id)

        to_update_notebook.user_id = current_user.id
        to_update_notebook.name = form.data['note_title']

        db.session.commit()
        return to_update_notebook.to_dict()
    return {}

@notebooks_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    db.session.delete(notebook)
    db.session.commit()
    return {}
