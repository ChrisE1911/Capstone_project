import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"



export default function CreateNote() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [noteTitle, setNoteTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefaut();

        const new_note = {
            noteTitle,
            noteContent
        }

        // await dispatch(thunkCreateNote(new_note)).then(() => {
        //     closeModal();
        //     history.push('/notes')
        // })
    }

    return (
        <>
          <h1>What's on the to-do list for today...</h1>
          <form onSubmit={handleSubmit}>
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
