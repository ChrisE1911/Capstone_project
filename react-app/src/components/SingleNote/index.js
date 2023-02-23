import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { thunkGetAllNotes } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'
import './SingleNote.css'


function SingleNote() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { noteId } = useParams()
    const singleNote = useSelector(state => state.noteReducer.singleNote)



    useEffect(() => {
        dispatch(thunkGetOneNote(noteId))
    }, [dispatch])

    return (
        <>
        <div className='single-note-container'>
            <h1>{`Title - ${singleNote.note_title}`}</h1>
            <p>{singleNote.note_content}</p>
        <button onClick={() => history.push(`/notes/edit`)}>Edit Note</button>
        </div>
        </>
    )
}


export default SingleNote