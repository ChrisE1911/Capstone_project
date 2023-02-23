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

    return (
        <>
            <ul className='notes-container'>
                {all_notes_arr.map((note) => (
                    <Link to={`/notes/${note.id}`} className='one_note' key={note.id}>
                        <div>
                            <div>{note.note_title}</div>
                            <div>{`${note.note_content?.slice(0, 40)}...`}</div>
                        </div>
                        <div>
                        <button onClick={() => history.push("/notes/edit")}>Edit Note</button>
                        </div>
                    </Link>
                ))}
            </ul>
        </>
    )
}


export default Notes
