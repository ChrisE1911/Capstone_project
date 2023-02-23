import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNote } from "../../store/note"
import "./CreateNote.css"



function CreateNote() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    const new_note = {
      noteTitle,
      noteContent
    }

    // console.log('NEW NOTTTEEEEE', new_note)

    await dispatch(thunkCreateNote(new_note));
    // closeModal();
    console.log('HEREEEEEE!!!!!!!');
    history.push('/notes');
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
        <button type="submit">Create Note</button>
      </form>
    </>
  );
}

export default CreateNote
