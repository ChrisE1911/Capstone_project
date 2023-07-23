import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkGetAllNotebooks } from '../../store/notebook'
import { Link, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import CreateNotebook from '../CreateNotebook'
import './Notebooks.css'

function Notebooks() {
    const dispatch = useDispatch()
    const allNotebooks = useSelector(state => state.notebookReducer.allNotebooks)
    const allNotebooksArr = Object.values(allNotebooks)
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()

    

    useEffect(() => {
        dispatch(thunkGetAllNotebooks())
    }, [dispatch])



    if (allNotebooksArr.length === 0) return (
        <div>
            <div id='no-notebooks-container'>
                <h1 id='no-notebooks'>Please create a notebook to view them here...</h1>
                <div id='new-notebook-button'>
                    {sessionUser && <OpenModalButton
                        buttonText="New Notebook"
                        modalComponent={<CreateNotebook />}>
                    </OpenModalButton>}
                </div>
            </div>
        </div>
    );
    if (!sessionUser) history.push('/unknown')
    return (
        <>
            <ul className='notebooks-container'>
                <div className='inner-noteboooks-container'>
                    <h1>NoteBooks</h1>
                    <br />
                    <div id='inner-notebooks-container-title-bar'>
                        <div>{`${allNotebooksArr.length} notebooks`}</div>
                        <div id='new-notebook-button'>
                            {sessionUser && <OpenModalButton
                                buttonText="New Notebook"
                                modalComponent={<CreateNotebook />}>
                            </OpenModalButton>}
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div id='column-titles'>
                        <div>Title</div>
                        <div>Created By</div>
                        <div>Updated</div>
                    </div>
                    {/* {allNotebooksArr.length === 0 && <div>Navigate to the notes page to add some notes to see them here...</div>} */}
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
