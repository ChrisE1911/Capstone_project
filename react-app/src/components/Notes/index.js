import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotes } from '../../store/note'
import { useHistory, Link } from 'react-router-dom'
import './Notes.css'

function Notes() {
    const dispatch = useDispatch()
    const history = useHistory()
    const all_notes = useSelector((state) => state.noteReducer.allNotes)
    const all_notes_arr = Object.values(all_notes)

    console.log(all_notes_arr)

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    if (all_notes_arr.length === 0) return null;
    return (
        <>
            <div>
                <ul className='notes-side-panel-container'>
                    <h1>Notes</h1>
                    {<div className='total-notes'>{all_notes_arr.length} notes</div>}
                    <div id='side-panel-break-line'></div>
                    <div className='note-side-panel-card-container'>
                        {all_notes_arr.map((note) => (
                            <Link to={`/notes/${note.id}`} className='side-panel-one-note' key={note.id}>
                                <div id='side-panel-notes-content'>
                                    <div>{note.note_title}</div>
                                    <div>{`${note.note_content?.slice(0, 40)}...`}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ul>
                
            </div>
        </>
    )
}


export default Notes
