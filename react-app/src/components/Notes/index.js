import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotes } from '../../store/note'
import { useHistory, Link } from 'react-router-dom'
import SingleNote from '../SingleNote'
import { thunkGetOneNote } from '../../store/note'
import parse from 'html-react-parser'
import './Notes.css'

function Notes({ noteId }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const all_notes = useSelector((state) => state.noteReducer.allNotes)
    const sessionUser = useSelector((state) => state.session.user)
    const all_notes_arr = Object.values(all_notes)

    

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])


    // if (loaded === false) return <h1 id='no-notebooks'>Please create a note to view it here...</h1>;
    if (!sessionUser) history.push('/unknown')
    if(all_notes_arr.length === 0) return <h1 id='no-notebooks'>Please create a note to view it here...</h1>
    return (
        <>
            <div className='whole-notes-container'>
                <ul className='notes-side-panel-container'>
                    <h1>Notes</h1>
                    {<div className='total-notes'>{all_notes_arr.length} notes</div>}
                    <div id='side-panel-break-line'></div>
                    <div className='note-side-panel-card-container'>
                        {all_notes_arr.map((note) => (
                            <button onClick={() => dispatch(thunkGetOneNote(note.id))} className='side-panel-one-note' key={note.id}>
                                <div id='side-panel-notes-content'>
                                    <div>
                                    <div id='title'>{note.note_title}</div>
                                    </div>
                                    <div>{new Date(note.updated_at).toDateString().split(' ').splice(1, 2).join(' ')}</div>
                                </div>
                            </button>
                    ))}
                    </div>
                </ul>
                <div id='Note-Component'>
                    {<SingleNote />}
                </div>
            </div>
        </>
    )
}


export default Notes
