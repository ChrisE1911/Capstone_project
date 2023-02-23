const GET_NOTES = "notes/GET_NOTES"
const GET_ONE_NOTE = "notes/GET_ONE_NOTE"
const CREATE_NOTE = "notes/CREATE_NOTE"
const EDIT_NOTE = "notes/EDIT_NOTE"
const DELETE_NOTE = "notes/DELETE_NOTE"


const getAllNotesAction = (data) => ({
    type: GET_NOTES,
    payload: data
})

const createNoteAction = (data) => ({
    type: CREATE_NOTE,
    payload: data
})

const editNoteAction = (data) => ({
    type: EDIT_NOTE,
    payload: data
})

const deleteNoteAction = (data) => ({
    type: DELETE_NOTE,
    payload: data
})

const getOneNoteAction = (data) => ({
    type: GET_ONE_NOTE,
    payload: data
})



export const thunkGetAllNotes = () => async (dispatch) => {
    const response = await fetch("/api/notes/all")

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllNotesAction(data))
        return data
    }
}

export const thunkGetOneNote = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getOneNoteAction(data))
        return data
    }
}

export const thunkCreateNote = (note) => async (dispatch) => {
    const response = await fetch("/api/notes/new", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
    })


    if (response.ok) {
        const note = await response.json()
        console.log('NOTE', note)
        dispatch(createNoteAction(note))
        return note
    }
}

export const thunkEditNote = (noteId, note) => async (dispatch) => {
    const response = await fetch(`/api/notes/edit/${noteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editNoteAction(data))
        return data
    }
}

export const thunkDeleteNote = (note) => async (dispatch) => {
    const response = await fetch("api/notes/delete", {
        method: "DELETE"
    })

    if (response.ok) {
        const removedNote = await response.json()
        dispatch(deleteNoteAction(removedNote))
    }
}



const initialState = {
    allNotes: {},
    singleNote: {}
}


export default function noteReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_NOTES:
            newState = { ...state }
            const newNotes = {}
            action.payload.forEach((note) => {
                newNotes[note.id] = note
            })
            newState.allNotes = newNotes
            newState.singleNote = {}
            return newState
        case  GET_ONE_NOTE:
            return {...state, singleNote: action.payload}
        case CREATE_NOTE:
            newState = { ...state }
            const newNote = action.payload
            const newNoteState = { ...newState.allNotes, newNote }
            newState.allNotes = newNoteState
            return newState
        case EDIT_NOTE:
            newState = { ...state }
            const editedNote = action.payload
            delete newState.allNotes[editedNote.id]
            newState.allNotes[action.payload.id] = editedNote
            newState.singleNote = editedNote
            return newState
        case DELETE_NOTE:
            newState = { ...state }
            delete newState.allNotes[action.payload.id]
            return newState
        default:
            return state
    }
}
