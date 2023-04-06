import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import OpenModalButton from '../OpenModalButton'
import { thunkUpdateTasks } from '../../store/task'
import AddTask from '../AddTask'
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
        await dispatch(thunkUpdateTasks(taskId, task))
    }

    const filteredTasks = tasks_arr.filter(task => task.is_completed === showCompleted)

    return (
        <div className="notebooks-container">
            <h1 style={{ textAlign: 'center' }}>Tasks</h1>
            <div className='task-list'>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <button id='task-toggle-button' onClick={() => setShowCompleted(true)}>Completed Tasks</button>
                    <button id='task-toggle-button' onClick={() => setShowCompleted(false)}>Uncompleted Tasks</button>
                    <OpenModalButton
                        buttonText="Add Task"
                        className=""
                        modalComponent={<AddTask />}>
                    </OpenModalButton>
                </div>
                <h2 style={{ textAlign: 'center' }}>{showCompleted ? 'Completed Tasks' : 'Uncompleted Tasks'}</h2>
                <ul>
                    {filteredTasks.map((task) => (
                        <div id='task-container'>
                            <li id='task-list-one' key={task.id}>
                                {task.task_content}
                            </li>
                            <input
                                type="checkbox"
                                checked={task.is_completed}
                                onChange={() => handleCheckboxChange(task.id, task)}
                            />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks
