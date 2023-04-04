import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import "./Tasks.css"



function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.taskReducer.allTasks)
    const tasks_arr = Object.values(tasks)

    console.log(tasks_arr)

    useEffect(() => {
        dispatch(thunkGetAllTasks())
    }, [dispatch])

    return (
        <div className="notebooks-container">
            <h1>Tasks List</h1>
            <div className='task-list'>
                <ul>
                    {tasks_arr.map((task) => (
                        <li id='task-list-one'>
                            {task.task_content}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks
