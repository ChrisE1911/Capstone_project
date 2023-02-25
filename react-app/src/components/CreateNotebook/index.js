import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNotebook } from "../../store/notebook"


function CreateNotebook() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newNotebook = {
            name: name
        }

        await dispatch(thunkCreateNotebook(newNotebook));

        history.push('/notebooks')

    }

    return (
        <>
         <form className="create-note-container" onSubmit={handleSubmit}>
           <h1>Choose the name of your new Notebook</h1>
           {/* <ul>
                 {errors.map((error, idx) => (
                   <li key={idx}>{error}</li>
                 ))}
               </ul> */}
           <label>
             Title
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
             />
           </label>
           <button type="submit">Create Note</button>
         </form>
       </>
     );
}

export default CreateNotebook
