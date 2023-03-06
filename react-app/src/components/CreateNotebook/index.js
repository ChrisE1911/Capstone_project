import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNotebook } from "../../store/notebook"
import { thunkGetAllNotebooks } from "../../store/notebook"
import { useModal } from "../../context/Modal"


function CreateNotebook() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([])
  const [name, setName] = useState("")
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = []

    if (name?.length < 1) {
      errors.push('You must specify a title for this notebook')
    }

    setErrors(errors)
  }, [name])


  const handleSubmit = async (e) => {
    e.preventDefault()

    const newNotebook = {
      name: name
    }

    const createdNotebook = await dispatch(thunkCreateNotebook(newNotebook))

    console.log(createdNotebook)

    if (createdNotebook.length) {
      setErrors(createdNotebook)
    } else {
      await dispatch(thunkGetAllNotebooks())
      history.push('/notebooks')
      closeModal();
    }
  }
  return (
    <>
      <form className="create-note-container" onSubmit={handleSubmit}>
        <div id='create-note-inner-container'>

          <h1>Choose the name of your new Notebook</h1>
          <ul>
                 {errors.map((error, idx) => (
                   <li key={idx}>{error}</li>
                   ))}
                  </ul>
          <label>
            Title*
            <input
              type="text"
              value={name}
              id='input-field'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
          <button className='universal-button' type="submit">Create Notebook</button>
      </form>
    </>
  );
}

export default CreateNotebook
