import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { Link } from 'react-router-dom'
import './Notebooks.css'

function Notebooks() {
    const dispatch = useDispatch()
    const allNotebooks = useSelector(state => state.notebookReducer.allNotebooks)
    const allNotebooksArr = Object.values(allNotebooks)
    const sessionUser = useSelector(state => state.session.user)

    console.log(allNotebooksArr)

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
    }, [dispatch])



    if (allNotebooksArr.length === 0) return null;
    return (
        <>
            <ul className='notebooks-container'>
                <div className='inner-noteboooks-container'>
                    <h1>NoteBooks</h1>
                    <br />
                    <div>{`${allNotebooksArr.length} notebooks`}</div>
                    <br />
                    <div id='column-titles'>
                        <div>Title</div>
                        <div>Created By</div>
                        <div>Updated</div>
                    </div>
                    {allNotebooksArr.map((notebook) => (
                        <Link to={`/notebooks/${notebook.id}`} className='one_notebook' key={notebook.id}>
                            <div id={notebook.id % 2 === 0 ? 'notebooks-content' : 'notebooks-content-two'}>
                                <div>{notebook.name}</div>
                                <div>{`${sessionUser.firstname} ${sessionUser.lastname}`}</div>
                                <div>{notebook.updated_at}</div>
                                {/* <div>{`${note.note_content?.slice(0, 40)}...`}</div> */}

                            </div>
                        </Link>
                    ))}
                </div>
            </ul>
        </>
    )
}


export default Notebooks
