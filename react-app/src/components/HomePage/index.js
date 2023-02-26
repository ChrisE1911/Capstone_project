import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotes } from '../../store/note'
import { useHistory, Link } from 'react-router-dom'
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const all_notes = useSelector((state) => state.noteReducer.allNotes)
    const all_notes_arr = Object.values(all_notes)





    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    if (all_notes_arr.length === 0) return null;
    return (
        <>
            <ul className='notes-container'>
                <h1>Notes</h1>
                <div className='note-card-container'>
                    {all_notes_arr.map((note) => (
                        <Link to={`/notes/${note.id}`} className='one_note' key={note.id}>
                            <div id='notes-content'>
                                <div>
                                    <div>{note.note_title}</div>
                                    <div>{`${note.note_content?.slice(0, 40)}...`}</div>
                                </div>
                                    <div>{new Date(note.updated_at).toDateString().split(' ').splice(1, 2).join(' ')}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </ul>
        </>
    )
}

export default HomePage
