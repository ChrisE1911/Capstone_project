const GET_NOTES = "notes/GET_NOTES"
const GET_ONE_NOTE = "notes/GET_ONE_NOTE"
const CREATE_NOTE = "notes/CREATE_NOTE"
const EDIT_NOTE = "notes/EDIT_NOTE"
const DELETE_NOTE = "notes/DELETE_NOTE"
const ADD_NOTE_TO_NOTEBOOK = "notes/ADD_NOTE_TO_NOTEBOOK"
const DELETE_NOTE_TO_NOTEBOOK = "notes/DELETE_NOTE_TO_NOTEBOOK"

const addNotetoNotebookAction = data => ({
    type: ADD_NOTE_TO_NOTEBOOK,
    payload: data
})

const deleteNotetoNotebookAction = data => ({
    type: DELETE_NOTE_TO_NOTEBOOK,
    payload: data
})

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

export const thunkAddNotetoNotebook = (noteId, notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebooks/${notebookId}/add-note`, {
        method: "PUT"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch((addNotetoNotebookAction(data)))
        return data
    }
}

export const thunkDeleteNotefromNotebook = (noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/delete`, {
        method: "PUT"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch((deleteNotetoNotebookAction(data)))
        return data
    }
}

export const thunkEditNotetoNotebook = (noteId, notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}/notebooks/${notebookId}/edit`, {
        method: "PUT"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch((addNotetoNotebookAction(data)))
        return data
    }
}

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

export const thunkDeleteNote = (noteId) => async (dispatch) => {
    console.log('NOTE ID', noteId)
    const response = await fetch(`/api/notes/delete/${noteId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        // console.log('REMOVED NOTE', removedNote)
        const data = await response.json()
        dispatch(deleteNoteAction(noteId))
        return data
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
            return newState
        case GET_ONE_NOTE:
            return { ...state, singleNote: action.payload }
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
            delete newState.allNotes[action.payload]
            return newState
        case ADD_NOTE_TO_NOTEBOOK:
            newState = { ...state }
            const addedNote = action.payload
            delete newState.allNotes[addedNote.id]
            newState.allNotes[action.payload.id] = addedNote
            newState.singleNote = addedNote
            return newState
        case DELETE_NOTE_TO_NOTEBOOK:
            newState = { ...state }
            const deletedNote = action.payload
            delete newState.allNotes[deletedNote.id]
            newState.singleNote = {}
            return newState
        default:
            return state
    }
}
