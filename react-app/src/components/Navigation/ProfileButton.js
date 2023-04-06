import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { thunkAddTasks } from '../../store/task'
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import CreateNote from "../CreateNote";
import AddTask from "../AddTask";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef();
  const newDropdownRef = useRef(null)
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

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

  const handleClickOutside = (e) => {
    if (newDropdownRef.current && !newDropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  return (
    <>
      <div className="profile-top-left-container">
        <button className="profile-letter-button" onClick={openMenu}>
          {user && user?.firstname.slice(0, 1).toUpperCase()}
        </button>
        <div id="profile-name">
          {user && `${user.firstname} ${user.lastname}`}
        </div>
      </div>
      <br />
      <br />
      <br />
      {user && <div className="dropdown-container" ref={newDropdownRef}>
        <button className="dropdown-button" onClick={toggleDropdown}>
          <div id="plus-new">
            <i class="fa-light fa-plus"></i>
            <div style={{fontFamily: 'Dancing Script, cursive', fontFamily: 'Raleway, sans-serif'}}>New</div>
          </div>
          <i className={`fa-solid fa-angle-up ${isOpen ? 'open-carrot' : ''}`}></i>
        </button>
        {isOpen && (
          <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            <a href="#" className="dropdown-item">
              <i class="fa-solid fa-note-sticky" style={{color: '#216869'}}></i>
              <div id="dropdown-buttons">
                {user && <OpenModalButton
                  buttonText="Note"
                  className=""
                  modalComponent={<CreateNote />}>
                </OpenModalButton>}
              </div>
            </a>
            <a href="#" className="dropdown-item">
              <i class="fa-solid fa-circle-check" style={{color: '#216869'}}></i>
              <div id="dropdown-buttons">
              {user && <OpenModalButton
                  buttonText="Tasks"
                  className=""
                  modalComponent={<AddTask />}>
                </OpenModalButton>}
              </div>
            </a>
          </div>
        )}
      </div>}
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id="profile-info">
              {`${user.firstname} ${user.lastname}`}
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
