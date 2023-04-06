import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import { thunkUpdateTasks } from '../../store/task'
import "./Tasks.css"

function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.taskReducer.allTasks)
    const tasks_arr = Object.values(tasks)
    const [showCompleted, setShowCompleted] = useState(false)

    console.log(tasks_arr)

    useEffect(() => {
        dispatch(thunkGetAllTasks())
    }, [dispatch])

    const handleCheckboxChange = async (taskId, task) => {
        // Implement the logic to update the completed status of the task with taskId
        await dispatch(thunkUpdateTasks(taskId, task))
    }

    const filteredTasks = tasks_arr.filter(task => task.is_completed === showCompleted)

    return (
        <div className="notebooks-container">
            <h1>Tasks List</h1>
            <div className='task-list'>
                <div>
                    <button onClick={() => setShowCompleted(true)}>Completed Tasks</button>
                    <button onClick={() => setShowCompleted(false)}>Uncompleted Tasks</button>
                </div>
                <ul>
                    {filteredTasks.map((task) => (
                        <li id='task-list-one' key={task.id}>
                            {task.task_content}
                            <input
                                type="checkbox"
                                checked={task.is_completed}
                                onChange={() => handleCheckboxChange(task.id, task)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks
