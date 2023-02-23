const GET_NOTES = "notes/GET_NOTES"
const CREATE_NOTE = "notes/CREATE_NOTE"


const getAllNotesAction = (data) => ({
    type: GET_NOTES,
    payload: data
})

const createNoteAction = (data) => ({
    type: CREATE_NOTE,
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
        case CREATE_NOTE:
            newState = { ...state }
            const newNote = action.payload
            const newNoteState = { ...newState.allNotes, newNote }
            newState.allNotes = newNoteState
            return newState
        default:
            return state
    }
}
