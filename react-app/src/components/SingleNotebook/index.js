import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { thunkGetOneNotebook } from '../../store/notebook'
import { thunkGetAllNotes } from '../../store/note'
import './SingleNotebook.css'


function SingleNotebook() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { notebookId } = useParams()
    const allNotes = useSelector(state => state.noteReducer.allNotes)
    const allNotesArr = Object.values(allNotes)
    const notesForNotebook = allNotesArr.filter(note => note.notebook_id === Number(notebookId))

    console.log('ALL NOTES', notesForNotebook)

    useEffect(() => {
        dispatch(thunkGetOneNotebook(notebookId))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    const handleDelete = () => {

    }

    return (
        <>
            <h1>Notes in this notebook</h1>
            <div id='notebook-notes-container'>
            {notesForNotebook.map((note) => (
                <Link to={`/notes/${note.id}`}>
                    <div>{note.note_title}</div>
                    <div>{`${note.note_content?.slice(0, 40)}...`}</div>
                </Link>
            ))}
                <button onClick={() => history.push(`/notebooks/${notebookId}/edit`)}>Edit Notebook</button>
            </div>
        </>
    )
}



export default SingleNotebook
