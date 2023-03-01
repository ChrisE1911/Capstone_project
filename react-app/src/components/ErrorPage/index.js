import {
    useHistory
} from "react-router-dom"
function ErrorPage() {
    const history = useHistory();

    
    return (
        <>
            <div className="splash-container">
                <div id="splash-inner-container">
            <h1 id="splash-page-h1">You do not have access to this page. Please Log in or sign up!</h1>
        <button onClick={() => history.push('/')} className="universal-button">Go back to Main page</button>
                </div>
        </div>
        </>
    )
}

export default ErrorPage
