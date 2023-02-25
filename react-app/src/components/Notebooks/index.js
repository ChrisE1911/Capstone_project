import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { Link } from 'react-router-dom'

function Notebooks() {
    const dispatch = useDispatch()
    const allNotebooks = useSelector(state => state.notebookReducer.allNotebooks)
    const allNotebooksArr = Object.values(allNotebooks)

    console.log(allNotebooksArr)

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
    }, [dispatch])



    if (allNotebooksArr.length === 0) return null;
    return (
        <>
            <ul className='notes-container'>
                <h1>NoteBooks</h1>
                {allNotebooksArr.map((notebook) => (
                    <Link to={`/notebooks/${notebook.id}`} className='one_note' key={notebook.id}>
                        <div id='notes-content'>
                            <div>{notebook.name}</div>
                            {/* <div>{`${note.note_content?.slice(0, 40)}...`}</div> */}
                        </div>
                    </Link>
                ))}
            </ul>
        </>
    )
}


export default Notebooks
