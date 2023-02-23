import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditNote } from "../../store/note"
import { useParams } from "react-router-dom"
import { thunkGetOneNote } from "../../store/note"


function EditNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { noteId } = useParams()

    const currentNote = useSelector(state => state.noteReducer.singleNote)
    const [noteTitle, setNoteTitle] = useState(currentNote.note_title)
    const [noteContent, setNoteContent] = useState(currentNote.note_content)

    useEffect(() => {
        dispatch(thunkGetOneNote(currentNote.id))
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedNote = {
            note_title: noteTitle,
            note_content: noteContent
        }

        const editedNote = await dispatch(thunkEditNote(currentNote.id, updatedNote))

        console.log(editedNote)


        if (editedNote) history.push(`/notes/${currentNote.id}}`)
    }
    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
                <h1>What's on the to-do list for today...</h1>
                {/* <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul> */}
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
                <button type="submit">Edit Note</button>
            </form>
        </>
    );
}


export default EditNote
