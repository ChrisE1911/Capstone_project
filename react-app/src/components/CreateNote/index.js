import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNote } from "../../store/note"
import { useModal } from "../../context/Modal"
import "./CreateNote.css"



function CreateNote() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [errors, setErrors] = useState([])


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

    const newNote = {
      note_title: noteTitle,
      note_content: noteContent
    }

    // console.log('NEW NOTTTEEEEE', new_note)

    await dispatch(thunkCreateNote(newNote));
    closeModal();
  }

  return (
    <>
      <form className="create-note-container" onSubmit={handleSubmit}>
        <div id="create-note-inner-container">
        <h1>Create Note...</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div id="button-container">
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
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows="5"
              cols="33"
              required
            />
          </label>
        </div>
          <button className='universal-button' type="submit">Create Note</button>
          </div>
      </form>
    </>
  );
}

export default CreateNote
