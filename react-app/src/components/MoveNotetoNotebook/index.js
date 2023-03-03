import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { thunkEditNotetoNotebook } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'
import './MNTN.css'


function MoveNotetoNotebook() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const allNotebooks = useSelector((state) => state.notebookReducer.allNotebooks)
    const allNotebooks_arr = Object.values(allNotebooks)
    const currentNote = useSelector((state) => state.noteReducer.singleNote)
    const allOtherNotebooks = allNotebooks_arr.filter(notebook => notebook.id !== currentNote.notebook_id)
    const { noteId } = useParams()

    console.log('AOOOONNNN', allOtherNotebooks)


    console.log(allNotebooks)


    useEffect(() => {
        thunkGetOneNote(+noteId)
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
    }, [dispatch])

    const handleEditNote = async (noteId, notebookId) => {
        await dispatch(thunkEditNotetoNotebook(noteId, notebookId)).then(() => {
            closeModal();
            history.push(`/notebooks/${notebookId}`);
            alert(`You have assigned this note to a notebook`)
        });

    }

    return (
        <>
            <div className='notebook-modal-container'>
            {allOtherNotebooks.length >= 2 ? <h1>Choose which notebook you want to move this note to...</h1> : <h1>Please create some more notebooks in order to add this note to a different one...</h1>}
                {/* <h1>Choose which notebook you want to move this note to...</h1> */}
                {allOtherNotebooks.map((notebook) => (
                    <button className='universal-button' onClick={() => handleEditNote(currentNote.id, notebook.id)}>{notebook.name}</button>
                ))}
            </div>
        </>
    )
}

export default MoveNotetoNotebook
