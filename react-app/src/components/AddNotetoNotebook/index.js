import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { thunkAddNotetoNotebook } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'


function AddNotetoNotebook() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const allNotebooks = useSelector((state) => state.notebookReducer.allNotebooks)
    const allNotebooks_arr = Object.values(allNotebooks)
    const currentNote = useSelector((state) => state.noteReducer.singleNote)
    const { noteId } = useParams()


    console.log(allNotebooks)


    useEffect(() => {
        thunkGetOneNote(+noteId)
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
    }, [dispatch])

    const handleAddNote = async (noteId, notebookId) => {
        await dispatch(thunkAddNotetoNotebook(noteId, notebookId)).then(() => {
            closeModal();
            history.push(`/notebooks/${notebookId}`);
            alert(`You have assigned this note to a notebook`)
        });

    }

    return (
        <>
            <div className='notebook-modal-container'>
            <h1>Choose which notebook you want to add this note to...</h1>
                {allNotebooks_arr.map((notebook) => (
                    <button className='universal-button' onClick={() => handleAddNote(currentNote.id, notebook.id)}>{notebook.name}</button>
                ))}
            </div>
        </>
    )
}

export default AddNotetoNotebook
