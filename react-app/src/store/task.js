const GET_TASKS = "tasks/GET_TASKS"

const getAllTasksAC = data => ({
    type: GET_TASKS,
    payload: data
})


export const thunkGetAllTasks = () => async (dispatch) => {
    const response = await fetch("/api/tasks/all");

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllTasksAC(data))
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
            return newState
        default:
            return state
    }
}
