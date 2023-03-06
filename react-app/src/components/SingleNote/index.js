import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { thunkGetAllNotes } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'
import OpenModalButton from '../OpenModalButton'
import AddNotetoNotebook from '../AddNotetoNotebook'
import MoveNotetoNotebook from '../MoveNotetoNotebook'
import { thunkDeleteNotefromNotebook } from '../../store/note'
import EditNote from '../EditNote'
import './SingleNote.css'


function SingleNote() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { noteId } = useParams()
    const singleNote = useSelector(state => state.noteReducer.singleNote)
    const singleNoteArr = Object.values(singleNote)


    console.log('SINGLE NOTE', singleNote)

    useEffect(() => {
        dispatch(thunkGetOneNote())
    }, [dispatch])

    const handleDeleteNote = async(noteId) => {
        await dispatch(thunkDeleteNotefromNotebook(noteId)).then(() => dispatch(thunkGetOneNote(noteId)));
        alert('You have removed this note from its assigned notebook.')
    }

    if (singleNoteArr.length === 0) return <h1>Please click on a note to view there here...</h1>;
    return (
        <>
            <div id='note-design-container'>
                <div className='single-note-container'>
                    {singleNote.note_title ? <h1>{`${singleNote.note_title}`}</h1> : <h1>Click on a note to view contents</h1>}
                    <p>{singleNote.note_content}</p>
                    {/* <button onClick={() => history.push(`/notes/edit`)}>Edit Note</button> */}
                    <div id='button-container'>
                        {singleNote.note_title && <OpenModalButton
                            buttonText='Edit Note'
                            modalComponent={<EditNote />}></OpenModalButton>}
                        {!singleNote.notebook_id && singleNote.note_title && <OpenModalButton
                            buttonText='Add Note to Notebook'
                            modalComponent={<AddNotetoNotebook />}>
                        </OpenModalButton>}
                        {singleNote.notebook_id && singleNote.note_title && <OpenModalButton
                            buttonText='Move Note'
                            modalComponent={<MoveNotetoNotebook />}></OpenModalButton>}
                        {singleNote.notebook_id && singleNote.note_title && <button onClick={() => handleDeleteNote(+singleNote.id)}>Take note out of notebook</button>}
                    </div>

                </div>
            </div>
        </>
    )
}


export default SingleNote
