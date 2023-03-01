import './Splashpage.css'
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from '../OpenModalButton';

function SplashPage() {

    const handleSubmit = () => {
       console.log('HERE I AM')
    }


    return (
        <>
            <div className="splash-container">
                <h1 id='splash-page-h1'>ETERNAL NOTE</h1>
                <h4>Where your thoughts are endless...</h4>
                <div>
                </div>
                    <h3>Click the button in the top left corner to Login/Sign up and see what our site has to offer...</h3>
                <button id='splashpage-button'>
                    <img src='https://luckyretail.com/Uploadfile/201909162/292816/292816-2.jpg'></img>
                </button>
            </div>
        </>
    )
}

export default SplashPage
