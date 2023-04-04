import ProfileButton from '../Navigation/ProfileButton'
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import './Splashpage.css'

function SplashPage({ isLoaded }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const ulRef = useRef();
    const newDropdownRef = useRef(null)
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef?.current?.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);


    return (
        <>
            <div className='splash-top-bar'>
                <div id='splash-top-bar-title-logo'>
                    <div id='e-circle-logo'>
                        <i class="fa-solid fa-e"></i>
                    </div>
                    <h1 id='splash-page-h1'>ETERNAL NOTE</h1>
                    <div id='splash-page-buttons'>
                        <OpenModalButton
                            buttonText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />

                        <OpenModalButton
                            buttonText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                </div>

            </div>
            <div className="splash-container">
                <div className='splash-container-content'>
                    <h1>Where your thoughts are endless...</h1>
                    <button id='splashpage-button'>
                        <img src='https://luckyretail.com/Uploadfile/201909162/292816/292816-2.jpg'></img>
                    </button>
                </div>
                <div id='up'></div>
                <div id='down'></div>
                <div id='left'></div>
                <div id='right'></div>
            </div>
        </>
    )
}

export default SplashPage
