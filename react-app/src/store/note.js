const GET_NOTES = "notes/GET_NOTES"


const getAllNotesAction = (data) => ({
    type: GET_NOTES,
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



const initialState = {
    allNotes:{}
}


export default function noteReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTES:
            const newState = { ...state }
            const newNotes = {}
            action.payload.forEach((note) => {
                newNotes[note.id] = note
            })
            newState.allNotes = newNotes
            return newState
        default:
            return state
    }
}
