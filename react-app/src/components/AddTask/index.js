import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkAddTasks } from '../../store/task'
import { thunkGetAllTasks } from "../../store/task"

import { useModal } from "../../context/Modal"
import './AddTask.css'

function AddTask() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [taskContent, setTaskContent] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            task_content: taskContent
        }

        const createdTask = await dispatch(thunkAddTasks(newTask));


        if (createdTask.length > 0) {
            setErrors(createdTask)
        } else {
            await dispatch(thunkGetAllTasks());
            history.push('/all-tasks')
            closeModal();
        }
    }

    return (
        <>
            <>
                <form className="create-note-container" onSubmit={handleSubmit}>
                    <div id="create-note-inner-container">
                        <h1>Add Task...</h1>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <div id="button-container">
                            <label>
                                Content*
                                <input
                                    type="text"
                                    value={taskContent}
                                    id='input-field'
                                    onChange={(e) => setTaskContent(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <br/>
                        <button className='universal-button' type="submit">Create Task</button>
                    </div>
                </form>
            </>

        </>
    )
}

export default AddTask
