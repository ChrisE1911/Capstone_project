import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotes } from '../../store/note'

function Notes() {
    const dispatch = useDispatch()
    const all_notes = useSelector((state) => state.noteReducer.allNotes)
    const all_notes_arr = Object.values(all_notes)

    console.log(all_notes_arr)

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    return (
        <>
            <h1>Hello World</h1>
            <ul className='notes-container'>
                {all_notes_arr.map((note) => (
                    <div key={note.id}>
                        <div>{note.note_title}</div>
                        <div>{note.note_content}</div>
                    </div>
                ))}
            </ul>
        </>
    )
}


export default Notes
