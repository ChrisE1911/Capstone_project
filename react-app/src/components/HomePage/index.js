import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotes } from '../../store/note'
import { useHistory, Link } from 'react-router-dom'
import { thunkGetOneNote } from '../../store/note'
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const all_notes = useSelector((state) => state.noteReducer.allNotes)
    const all_notes_arr = Object.values(all_notes)





    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    if (all_notes_arr.length === 0) return <h1 id='no-notebooks'>Please create a note to view it here...</h1>;
    return (
        <>
            <ul className='notes-container'>
                <div id='notes-additional-style-container'>
                    <div id='notes-title-container'>
                        <h3 id='note-title'>Notes</h3>
                    </div>
                    <div className='note-card-container'>
                        {all_notes_arr.map((note) => (
                            <Link onClick={() => dispatch(thunkGetOneNote(note.id)).then(() => console.log(note.id)).then((history.push('/notes')))} className='one_note' key={note.id}>
                                <div id='notes-content'>
                                    <div id='inner-notes-content'>
                                        <div>{note.note_title?.slice(0,6)}</div>
                                        <div>{`${note.note_content?.slice(0, 6)}...`}</div>
                                    </div>
                                    <div>{new Date(note.updated_at).toDateString().split(' ').splice(1, 2).join(' ')}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </ul>
        </>
    )
}

export default HomePage
