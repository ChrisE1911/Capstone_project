from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('notebooks.id')), nullable=True)
    note_title = db.Column(db.String(50), nullable=False)
    note_content = db.Column(db.String(3000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # relationships

    notebook = db.relationship('Notebook', back_populates='notes')
    user = db.relationship('User', back_populates='notes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'notebook_id': self.notebook_id,
            'note_title': self.note_title,
            'note_content': self.note_content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
