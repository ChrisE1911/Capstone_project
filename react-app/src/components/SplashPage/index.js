import './Splashpage.css'
import ProfileButton from '../Navigation/ProfileButton'
import { useSelector } from 'react-redux'

function SplashPage({ isLoaded }) {

    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div className='splash-top-bar'>
                <div id='splash-top-bar-title-logo'>
                    <div id='e-circle-logo'>
                        <i class="fa-solid fa-e"></i>
                    </div>
                    <h1 id='splash-page-h1'>ETERNAL NOTE</h1>
                    {isLoaded && (
                        <ProfileButton user={sessionUser} />
                    )}
                </div>

            </div>
            <div className="splash-container">
                <div id='up'></div>
                <div id='down'></div>
                <div id='left'></div>
                <div id='right'></div>
                <div className='splash-container-content'>
                    <h4>Where your thoughts are endless...</h4>
                    <div>
                    </div>
                    <h3>Click the button in the top left corner to Login/Sign up and see what our site has to offer...</h3>
                    <button id='splashpage-button'>
                        <img src='https://luckyretail.com/Uploadfile/201909162/292816/292816-2.jpg'></img>
                    </button>
                </div>
            </div>
        </>
    )
}

export default SplashPage
