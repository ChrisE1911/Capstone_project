import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllTasks } from '../../store/task'
import { Link, useHistory } from 'react-router-dom'


function Tasks() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkGetAllTasks())
    }, [dispatch])

    return (
        <div className="notebooks-container">
            <h1>Hello World</h1>
        </div>
    )
}

export default Tasks
