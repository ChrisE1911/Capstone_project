import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditNote } from "../../store/note"
// import { useParams } from "react-router-dom"
import { thunkGetOneNote } from "../../store/note"
import { thunkDeleteNote } from "../../store/note"
import { thunkGetAllNotes } from "../../store/note"
import { useModal } from "../../context/Modal"


function EditNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    // const { noteId } = useParams()
    const { closeModal } = useModal()


    const currentNote = useSelector(state => state.noteReducer.singleNote)
    const allNotes = useSelector(state => state.noteReducer.allNotes)
    const allNotesArr = Object.values(allNotes)
    const [noteTitle, setNoteTitle] = useState(currentNote.note_title)
    const [noteContent, setNoteContent] = useState(currentNote.note_content)
    const [errors, setErrors] = useState([])

    console.log('CURRENT NOTE', currentNote.id)

    console.log(allNotesArr[0])

    useEffect(() => {
        dispatch(thunkGetOneNote(+currentNote.id))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (noteTitle?.length < 1) {
            errors.push('You must specify a title for this note')
        }

        if (noteContent?.length < 1) {
            errors.push('Please provide content for this note')
        }

        setErrors(errors)
    }, [noteTitle, noteContent])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedNote = {
            note_title: noteTitle,
            note_content: noteContent
        }

        const editedNote = await dispatch(thunkEditNote(currentNote.id, updatedNote))

        console.log(editedNote)


        if (editedNote?.length > 0) {
            setErrors(editedNote)
          } else {
            await dispatch(thunkGetAllNotes()).then(() => dispatch(thunkGetOneNote(editedNote.id)));
            history.push('/notes')
            closeModal();
          }
        }

    const handleDelete = async (noteId) => {

        if (allNotesArr[0].id === noteId) {
            const deletedNote = await dispatch(thunkDeleteNote(noteId))

            if (deletedNote) {
                await dispatch(thunkGetAllNotes()).then(() => dispatch(thunkGetOneNote(Number(deletedNote.id + 1))));
            }
            closeModal();
        } else {
            await dispatch(thunkDeleteNote(noteId)).then(() => dispatch(thunkGetAllNotes())).then(() => dispatch(thunkGetOneNote(allNotesArr[0].id)));
            history.push('/notes')
            closeModal();
        }
    }

    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
                <div id='create-note-inner-container'>
                    <h1>What's on the to-do list for today...</h1>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Title
                        <input
                            type="text"
                            value={noteTitle}
                            id='input-field'
                            onChange={(e) => setNoteTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Note
                        <textarea
                            type="text"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            required
                        />
                    </label>
                    <button className='universal-button' type="submit">Edit</button>
                    <button onClick={() => handleDelete(currentNote.id)} className='universal-button'>Delete Note</button>
                </div>
            </form>
        </>
    );
}


export default EditNote
