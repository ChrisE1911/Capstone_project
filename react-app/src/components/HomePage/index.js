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
    const sessionUser = useSelector((state) => state.session.user)
    const all_notes_arr = Object.values(all_notes)


    const date = new Date(Date.now()).toDateString()



    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])

    if (all_notes_arr.length === 0) return <h1 id='no-notebooks'>Please create a note to view it here...</h1>;
    return (
        <>
            <div id='intro-bar'>
                <h3 style={{ marginLeft: '21vw' }}>{`Hello, ${sessionUser.firstname}!`}</h3>
                <h4>{date}</h4>
            </div>
            <ul className='notes-container'>
                <div id='notes-additional-style-container'>
                    <div id='notes-title-container'>
                        <h3 id='note-title'>Notes</h3>
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                    <div className='note-card-container'>
                        {all_notes_arr.map((note) => (
                            <Link onClick={() => dispatch(thunkGetOneNote(note.id)).then(() => console.log(note.id)).then((history.push('/notes')))} className='one_note' key={note.id}>
                                <div id='notes-content'>
                                    <div id='inner-notes-content'>
                                        <div>{note.note_title}</div>
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
