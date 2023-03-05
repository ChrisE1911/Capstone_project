import './Splashpage.css'
import { useEffect, useState } from 'react';
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from '../OpenModalButton';
import { colors } from './data'

function SplashPage() {

    return (
        <>
            <div className="splash-container">
                <div id='up'></div>
                <div id='down'></div>
                <div id='left'></div>
                <div id='right'></div>
                <div className='splash-container-content'>
                    <h1 id='splash-page-h1'>ETERNAL NOTE</h1>
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
