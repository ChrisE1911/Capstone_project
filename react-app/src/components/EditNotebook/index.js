import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneNotebook } from "../../store/notebook";
import { thunkEditNotebook } from "../../store/notebook";
import { useHistory } from "react-router-dom";
import { thunkGetAllNotebooks } from "../../store/notebook";
import { useParams } from "react-router-dom";
import { thunkDeleteNotebook } from "../../store/notebook";
import { useModal } from "../../context/Modal";
import './EditNotebook.css'


function EditNotebook() {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentNotebook = useSelector(state => state.notebookReducer.singleNotebook)
    const { notebookId } = useParams()
    const [name, setName] = useState(currentNotebook.name)
    const { closeModal } = useModal()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = []


        if (name?.length < 1) {
            errors.push('You must specify a title for this notebook')
        }

        setErrors(errors)
    }, [name])


    useEffect(() => {
        dispatch(thunkGetOneNotebook(currentNotebook.id))
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name: name
        }

        const editedNotebook = await dispatch(thunkEditNotebook(currentNotebook.id, data))

        if (editedNotebook?.length > 0) {
            setErrors(editedNotebook)
        } else {
            await dispatch(thunkGetAllNotebooks()).then(() => dispatch(thunkGetOneNotebook(+currentNotebook.id)));
            history.push('/notebooks')
            alert(`Your notebook name has been changed to ${editedNotebook.name}`);
            closeModal();
        }
    }

    const handleDelete = async (notebookId) => {
        await dispatch(thunkDeleteNotebook(notebookId)).then(() => dispatch(thunkGetAllNotebooks()))

        closeModal();

        await history.push('/notebooks');

        alert('Your notebook has been deleted.')
    }


    return (
        <>
            <form className="create-note-container" onSubmit={handleSubmit}>
                <h1>New Title...</h1>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Name*
                    <input
                        type="text"
                        value={name}
                        id='input-field'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button className='universal-button' type="submit">Edit</button>
                <button onClick={() => handleDelete(currentNotebook.id)} className='universal-button'>Delete Notebook</button>
            </form>
        </>
    );
}

export default EditNotebook
