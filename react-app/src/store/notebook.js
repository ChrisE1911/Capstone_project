const GET_NOTEBOOKS = "notes/GET_NOTEBOOKS"
const GET_ONE_NOTEBOOK = "notes/GET_ONE_NOTEBOOK"
const CREATE_NOTEBOOK = "notes/CREATE_NOTEBOOK"
const EDIT_NOTEBOOK = "notes/EDIT_NOTEBOOK"
const DELETE_NOTEBOOK = "notes/DELETE_NOTEBOOK"


const getAllNotebooksAction = (data) => ({
    type: GET_NOTEBOOKS,
    payload: data
})

const createNotebookAction = (data) => ({
    type: CREATE_NOTEBOOK,
    payload: data
})

const editNotebookAction = (data) => ({
    type: EDIT_NOTEBOOK,
    payload: data
})

const deleteNotebookAction = (data) => ({
    type: DELETE_NOTEBOOK,
    payload: data
})

const getOneNotebookAction = (data) => ({
    type: GET_ONE_NOTEBOOK,
    payload: data
})


export const thunkCreateNotebook = (notebook) => async (dispatch) => {
    const response = await fetch("/api/notebooks/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notebook),
    })

    if (response.ok) {
        const data = await response.json()
        console.log('NOTE', data)
        dispatch(createNotebookAction(data))
        return data
    }
}


export const thunkGetAllNotebooks = () => async (dispatch) => {
    const response = await fetch("/api/notebooks/all")

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllNotebooksAction(data))
        return data
    }
}


export const thunkGetOneNotebook = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getOneNotebookAction(data))
        return data
    }
}

export const thunkEditNotebook = (notebookId, notebook) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/edit/${notebookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notebook)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editNotebookAction(data))
        return data
    }
}

export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
    console.log('NOTE ID', notebookId)
    const response = await fetch(`/api/notebooks/delete/${notebookId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteNotebookAction(notebookId))
    }
}


const initialState = {
    allNotebooks: {},
    singleNotebook: {}
}

export default function notebookReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            newState = { ...state }
            const newNotebooks = {}
            action.payload.forEach((notebook) => {
                newNotebooks[notebook.id] = notebook
            })
            newState.allNotebooks = newNotebooks
            newState.singleNotebook = {}
            return newState
            case  GET_ONE_NOTEBOOK:
            return { ...state, singleNotebook: action.payload }
            case CREATE_NOTEBOOK:
                newState = { ...state }
                const newNotebook = action.payload
                const newNotebookState = { ...newState.allNotebooks, newNotebook }
                newState.allNotebooks = newNotebookState
                return newState
            case EDIT_NOTEBOOK:
                newState = { ...state }
                const editedNotebook = action.payload
                delete newState.allNotebooks[editedNotebook.id]
                newState.allNotebooks[action.payload.id] = editedNotebook
                newState.singleNotebook = editedNotebook
            return newState
            case DELETE_NOTEBOOK:
                newState = { ...state }
                delete newState.allNotebooks[action.payload]
                return newState
        default:
            return state
    }
}
