import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditNote } from "../../store/note"
// import { useParams } from "react-router-dom"
import { thunkGetOneNote } from "../../store/note"
import { thunkDeleteNote } from "../../store/note"
import { thunkGetAllNotes } from "../../store/note"
import { useModal } from "../../context/Modal"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
    const quillRef = useRef();

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

    const updateContent = (value) => {
        setNoteContent(value)
    }


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
            alert('Your note has been deleted')
            history.push('/home')
        } else {
            await dispatch(thunkDeleteNote(noteId)).then(() => dispatch(thunkGetAllNotes())).then(() => dispatch(thunkGetOneNote(allNotesArr[0].id)));
            alert('Your note has been deleted')
            history.push('/home')
            closeModal();
        }
    }

    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
                <div id='create-note-inner-container'>
                    <h1>Edit Note...</h1>
                    <label>
                        Title*
                        <input
                            type="text"
                            value={noteTitle}
                            id='input-field'
                            onChange={(e) => setNoteTitle(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <ReactQuill value={noteContent} onChange={updateContent} modules={{
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ color: [] }, { background: [] }],
                            ['clean'],
                        ],
                    }} />
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <button className='universal-button' type="submit">Save</button>
                    <button onClick={() => handleDelete(currentNote.id)} className='universal-button'>Delete Note</button>
                </div>
            </form>
        </>
    );
}


export default EditNote
