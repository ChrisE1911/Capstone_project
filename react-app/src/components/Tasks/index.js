import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import { thunkUpdateTasks } from '../../store/task'
import "./Tasks.css"

function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.taskReducer.allTasks)
    const tasks_arr = Object.values(tasks)

    console.log(tasks_arr)

    useEffect(() => {
        dispatch(thunkGetAllTasks())
    }, [dispatch])

    const handleCheckboxChange = async (taskId, task) => {
        // Implement the logic to update the completed status of the task with taskId
        await dispatch(thunkUpdateTasks(taskId, task))
    }

    return (
        <div className="notebooks-container">
            <h1>Tasks List</h1>
            <div className='task-list'>
                <ul>
                    {tasks_arr.map((task) => (
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
