from app.models import db, Notebook, environment, SCHEMA

def seed_notebooks():
    notebook_one = Notebook(
        user_id=1,
        name="Chores"
    )
    notebook_two = Notebook(
        user_id=1,
        name="Homework assignments"
    )
    notebook_three = Notebook(
        user_id=2,
        name="Bills Coming Up"
    )
    notebook_four = Notebook(
        user_id=2,
        name="Random Thoughts"
    )
    notebook_five = Notebook(
        user_id=3,
        name="Work Deadlines"
    )
    notebook_six = Notebook(
        user_id=3,
        name="List of fun activities"
    )

    db.session.add(notebook_one)
    db.session.add(notebook_two)
    db.session.add(notebook_three)
    db.session.add(notebook_four)
    db.session.add(notebook_five)
    db.session.add(notebook_six)

    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()
