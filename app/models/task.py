from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    task_content = db.Column(db.String(3000), nullable=False)
    is_completed = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # relationships

    user = db.relationship('User', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'task_content': self.task_content,
            'is_completed': self.is_completed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
