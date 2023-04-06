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


@tasks_routes.route('/all')
@login_required
def get_all_tasks():
    all_tasks = Task.query.filter(Task.user_id == current_user.id).all()
    all_tasks_arr = [task.to_dict() for task in all_tasks]
    return all_tasks_arr

@tasks_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
    to_update_task = Task.query.get(id)

    to_update_task.is_completed = not to_update_task.is_completed

    db.session.commit()

    return to_update_task.to_dict()
