import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditNote } from "../../store/note"
// import { useParams } from "react-router-dom"
import { thunkGetOneNote } from "../../store/note"
import { thunkDeleteNote } from "../../store/note"


function EditNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    // const { noteId } = useParams()

    const currentNote = useSelector(state => state.noteReducer.singleNote)
    const [noteTitle, setNoteTitle] = useState(currentNote.note_title)
    const [noteContent, setNoteContent] = useState(currentNote.note_content)
    const [errors, setErrors] = useState([])

    console.log('CURRENT NOTE', currentNote.id)

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


        if (editedNote) history.push(`/notes/${currentNote.id}`)
    }

    const handleDelete = async (noteId) => {

        await dispatch(thunkDeleteNote(noteId))

        history.push('/notes')

        alert('Your note has been deleted.')
    }
    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
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
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Note
                    <input
                        type="text"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Edit</button>
                <button onClick={() => handleDelete(currentNote.id)}>Delete Note</button>
            </form>
        </>
    );
}


export default EditNote
