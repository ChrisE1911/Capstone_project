from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Task, db
from app.forms import TaskForm

tasks_routes = Blueprint('tasks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


tasks_routes.route('/all')
@login_required
def get_all_tasks():
    my_id = current_user.to_dict()

    all_tasks = Task.query.filter(Task.user_id == my_id['id']).all()
    all_tasks_arr = [task.to_dict() for task in all_tasks]
    return all_tasks_arr
