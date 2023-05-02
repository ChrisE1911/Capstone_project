import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNote } from "../../store/note"
import { thunkGetAllNotes } from "../../store/note"
import { thunkGetOneNote } from "../../store/note"
import { useModal } from "../../context/Modal"
import ReactQuill from 'react-quill';
import "./CreateNote.css"



function CreateNote() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [errors, setErrors] = useState([])


  const createContent = (value) => {
    setNoteContent(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      note_title: noteTitle,
      note_content: noteContent
    }

    // console.log('NEW NOTTTEEEEE', new_note)

    const createdNote = await dispatch(thunkCreateNote(newNote));

    console.log(createdNote)

    if (createdNote.length > 0) {
      setErrors(createdNote)
    } else {
      await dispatch(thunkGetAllNotes()).then(() => dispatch(thunkGetOneNote(createdNote.id)));
      history.push('/notes')
      closeModal();
    }
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
          <label>
            Note*
            {/* <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows="5"
              cols="33"
              required
            /> */}
              </label>
            <ReactQuill onChange={createContent} modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ color: [] }, { background: [] }],
                ['clean'],
              ],
            }} />
        </div>
        <div id="button-container">
          <button className='universal-button' type="submit">Create Note</button>
        </div>
      </form>
    </>
  );
}

export default CreateNote
