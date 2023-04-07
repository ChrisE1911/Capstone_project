import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import OpenModalButton from '../OpenModalButton'
import { Modal } from '../../context/Modal'
import { thunkUpdateTasks } from '../../store/task'
import EditTask from '../EditTask'
import AddTask from '../AddTask'
import "./Tasks.css"

function Tasks() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.taskReducer.allTasks)
    const tasks_arr = Object.values(tasks)
    const [showCompleted, setShowCompleted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true)

    console.log(tasks_arr)

    useEffect(() => {
        dispatch(thunkGetAllTasks())
    }, [dispatch])

    const handleCheckboxChange = async (taskId, task) => {
        await dispatch(thunkUpdateTasks(taskId, task))
    }

    const filteredTasks = tasks_arr.filter(task => task.is_completed === showCompleted)

    const pencil = <i class="fa-solid fa-pencil" onClick={() => setIsModalOpen(!isModalOpen)}></i>

    return (
        <div className="notebooks-container">
            <h1 style={{ textAlign: 'center' }}>Tasks</h1>
            <div className='task-list'>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    <div id='task-toggle-modal'>
                        <OpenModalButton
                            buttonText="Add Task"
                            className=""
                            modalComponent={<AddTask />}>
                        </OpenModalButton>
                    </div>
                    <button id='task-toggle-button' onClick={() => setShowCompleted(true)}>Completed Tasks</button>
                    <button id='task-toggle-button' onClick={() => setShowCompleted(false)}>Uncompleted Tasks</button>
                </div>
                <h2 style={{ textAlign: 'center' }}>{showCompleted ? 'Completed Tasks' : 'Uncompleted Tasks'}</h2>
                <ul>
                    {filteredTasks.map((task) => (
                        <div id='task-container'>
                            <li id='task-list-one' key={task.id}>
                                {task.task_content}
                            </li>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10%' }}>
                                <OpenModalButton
                                    buttonText={pencil}
                                    className=""
                                    modalComponent={<EditTask taskId={task.id} task={task} />}>
                                </OpenModalButton>
                                <input
                                    type="checkbox"
                                    checked={task.is_completed}
                                    onChange={() => handleCheckboxChange(task.id, task)}
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tasks
