import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkEditTask } from '../../store/task'
import { thunkGetAllTasks } from "../../store/task"

import { useModal } from "../../context/Modal"
import './EditTask.css'

function EditTask({ taskId, task }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [taskContent, setTaskContent] = useState(task.task_content)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            task_content: taskContent
        }

        const editedTask = await dispatch(thunkEditTask(taskId, updatedTask));

        

        if (editedTask.length > 0) {
            setErrors(editedTask)
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
                        <h1>Edit Task...</h1>
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
                        <br />
                        <button className='universal-button' type="submit">Save</button>
                    </div>
                </form>
            </>

        </>
    )
}

export default EditTask
