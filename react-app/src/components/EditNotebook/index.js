import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneNotebook } from "../../store/notebook";
import { thunkEditNotebook } from "../../store/notebook";
import { useHistory } from "react-router-dom";
import { thunkGetAllNotebooks } from "../../store/notebook";
import { useParams } from "react-router-dom";
import { thunkDeleteNotebook } from "../../store/notebook";


function EditNotebook() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { notebookId } = useParams()
    const [name, setName] = useState("")


    useEffect(() => {
        dispatch(thunkGetOneNotebook(+notebookId))
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name: name
        }

        const editedNotebook = await dispatch(thunkEditNotebook(notebookId, data))

        if (editedNotebook) history.push(`/notebooks/${notebookId}`)
    }

    const handleDelete = async (notebookId) => {
        await dispatch(thunkDeleteNotebook(notebookId))

        history.push('/notebooks');

        alert('Your notebook has been deleted.')
    }


    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
                <h1>New Title...</h1>
                {/* <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul> */}
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Edit</button>
                <button onClick={() => handleDelete(notebookId)}>Delete Notebook</button>
            </form>
        </>
    );
}

export default EditNotebook
