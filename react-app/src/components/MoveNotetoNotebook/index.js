import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { thunkEditNotetoNotebook } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'


function MoveNotetoNotebook() {
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

    const handleEditNote = async(noteId, notebookId) => {
        await dispatch(thunkEditNotetoNotebook(noteId, notebookId)).then(() => {
            closeModal();
            history.push(`/notebooks/${notebookId}`);
            alert(`You have assigned this note to a notebook`)
        });

    }

    return (
        <>
        <h1>Choose which notebook you want to move this note to...</h1>
            {allNotebooks_arr.map((notebook) => (
            <button onClick={() => handleEditNote(currentNote.id, notebook.id)}>{notebook.name}</button>
            ))}
            </>
    )
}

export default MoveNotetoNotebook
