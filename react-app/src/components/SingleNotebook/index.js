import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { thunkGetOneNotebook } from '../../store/notebook'
import { thunkGetAllNotes } from '../../store/note'
import { thunkGetOneNote } from '../../store/note'
import OpenModalButton from '../OpenModalButton'
import EditNotebook from '../EditNotebook'
import './SingleNotebook.css'


function SingleNotebook() {
    const dispatch = useDispatch()
    const { notebookId } = useParams()
    const allNotes = useSelector(state => state.noteReducer.allNotes)
    const allNotesArr = Object.values(allNotes)
    const sessionUser = useSelector(state => state.session.user)
    const notesForNotebook = allNotesArr.filter(note => note.notebook_id === Number(notebookId))
    const currentNotebook = useSelector(state => state.notebookReducer.singleNotebook)

    console.log('ALL NOTES', notesForNotebook)

    useEffect(() => {
        dispatch(thunkGetOneNotebook(notebookId))
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetAllNotes())
    }, [dispatch])
    return (
        <>
            <h1 id='Notebooks-title'>{`Notes in this notebook - (${currentNotebook.name})`}</h1>
            <div id='notebook-notes-container'>
            {notesForNotebook.length === 0 && <div>Navigate to the notes page to add some notes to see them here...</div>}
            {notesForNotebook.map((note, idx) => (
                <Link to={`/notes`} onClick={() => dispatch(thunkGetOneNote(note.id))} className={idx % 2 === 0 ? 'notebook-notes-inner-container': 'notebook-notes-inner-container-two'} key={note.id}>
                    <div>{note.note_title}</div>
                    {/* <div>{`${note.note_content?.slice(0, 40)}...`}</div> */}
                    <div>{`${sessionUser.firstname} ${sessionUser.lastname}`}</div>
                    <div>{note.updated_at}</div>
                </Link>
            ))}
                <div id='edit-button-container'>
                    {/* <button onClick={() => history.push(`/notebooks/${notebookId}/edit`)} className='edit-button'>Edit Notebook</button> */}
                    <OpenModalButton
                        buttonText='Edit Notebook'
                        className='edit-button'
                        modalComponent={<EditNotebook />}></OpenModalButton>
                </div>
            </div>
        </>
    )
}



export default SingleNotebook
