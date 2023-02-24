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


export const thunkGetAllNotebooks = () => async (dispatch) => {
    const response = await fetch("/api/notebooks/all")

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllNotebooksAction(data))
        return data
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
        default:
            return state
    }
}
