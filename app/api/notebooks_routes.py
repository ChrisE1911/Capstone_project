from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Notebook, db
from app.forms import NotebookForm

notebooks_routes = Blueprint('notebooks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@notebooks_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_notebook(id):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        to_update_notebook = Notebook.query.get(id)

        # print('TO UPDATE NOTEBOOK', to_update_notebook.to_dict())
        to_update_notebook.user_id = current_user.id
        to_update_notebook.name = form.data['name']

        db.session.commit()

        # print('NEWWWW UPDATED NOTEBOOK', to_update_notebook)
        return to_update_notebook.to_dict()
    print(validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@notebooks_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    notebook = Notebook.query.get(id)
    db.session.delete(notebook)
    db.session.commit()
    return {}
