const GET_TASKS = "tasks/GET_TASKS"
const ADD_TASKS = "tasks/ADD_TASKS"
const UPDATE_TASKS = "tasks/UPDATE_TASKS"
const REMOVE_TASKS = "tasks/REMOVE_TASKS"
const EDIT_TASKS = "tasks/EDIT_TASKS"
const COMPLETE_TASKS = "tasks/REMOVE_TASKS"

const getAllTasksAC = data => ({
    type: GET_TASKS,
    payload: data
})
const addTasksAC = data => ({
    type: ADD_TASKS,
    payload: data
})

const editTasksAC = data => ({
    type: UPDATE_TASKS,
    payload: data
})
const updateTasksAC = data => ({
    type: UPDATE_TASKS,
    payload: data
})
const removeTasksAC = data => ({
    type: REMOVE_TASKS,
    payload: data
})



export const thunkGetAllTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks/all")

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllTasksAC(data))
        return data
    }
}

export const thunkEditTask = (taskId, task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/edit/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( task )
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editTasksAC(data))
        return data
    } else if (response.status < 500) {
		const data = await response.json();
        if (data.errors) {

			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const thunkAddTasks = (task) => async (dispatch) => {
    const response = await fetch("/api/tasks/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(addTasksAC(data))
        return data
    } else if (response.status < 500) {
		const data = await response.json();
        if (data.errors) {
            
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}
export const thunkUpdateTasks = (taskId, task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/update/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(updateTasksAC(data))
        return data
    }
}

export const thunkRemoveTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/remove/${taskId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(removeTasksAC(taskId))
        return data
    }
}
const initialState = {
    allTasks: {}
}

export default function taskReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_TASKS:
            newState = { ...state }
            const newTasks = {}
            action.payload.forEach((task) => {
                newTasks[task.id] = task
            })
            newState.allTasks = newTasks
            // newState.singleNote = {}
            return newState
        // case GET_ONE_NOTE:
        //     return { ...state, singleNote: action.payload }
        case ADD_TASKS:
            newState = { ...state }
            const newTask = action.payload
            const newTaskState = { ...newState.allTasks, newTask }
            newState.allTasks = newTaskState
            return newState
        case UPDATE_TASKS:
            newState = { ...state }
            const editedTask = action.payload;
            const newTasksState = { ...newState.allTasks, [editedTask.id]: editedTask }
            newState.allTasks = newTasksState
            return newState
        case REMOVE_TASKS:
            newState = { ...state }
            delete newState.allTasks[action.payload]
            return newState
        // case ADD_NOTE_TO_NOTEBOOK:
        //     newState = { ...state }
        //     const addedNote = action.payload
        //     delete newState.allNotes[addedNote.id]
        //     newState.allNotes[action.payload.id] = addedNote
        //     newState.singleNote = addedNote
        //     return newState
        // case DELETE_NOTE_TO_NOTEBOOK:
        //     newState = { ...state }
        //     const deletedNote = action.payload
        //     delete newState.allNotes[deletedNote.id]
        //     newState.singleNote = {}
        //     return newState
        default:
            return state
    }
}



// export default function taskReducer(state = initialState, action) {
//     let newState;
//     switch (action.type) {
//         case GET_TASKS:
//             newState = { ...state }
//             const newTasks = {}
//             action.payload.forEach((task) => {
//                 newTasks[task.id] = task
//             })
//             newState.allTasks = newTasks
//             return newState
//         case ADD_TASKS:
//             newState = { ...state }
//             const newTask = action.payload
//             const newTaskState = { ...newState.allTasks, newTask }
//             newState.allTasks = newTaskState
//             return newState
//         case UPDATE_TASKS:
//             newState = { ...state }
//             const editedTask = action.payload
//             delete newState.allTasks[editedTask.id]
//             newState.allTasks[action.payload.id] = editedTask
//             return newState
//         case REMOVE_TASKS:
//             newState = { ...state }
//             delete newState.allTasks[action.payload]
//             return newState
//         default:
//             return state
//     }
// }
