import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { Link, useHistory } from 'react-router-dom'


function Tasks() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    return (
        <div className="notebooks-container">
            <h1>Hello World</h1>
        </div>
    )
}

export default Tasks
