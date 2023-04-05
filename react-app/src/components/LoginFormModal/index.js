import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ulRef = useRef();
  const newDropdownRef = useRef(null)
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const { closeModal } = useModal();
  const demoUser = () => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/home');
      closeModal();
    }
  };


  return (
    <>
      <h1>Log In</h1>
      <div style={{textAlign: "center"}} id='account-already-made'>
        <OpenModalButton
          buttonText="Don't have an account? Create one"
          onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div id="create-note-inner-container">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email*
            <input
              type="text"
              value={email}
              id='input-field'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password*
            <input
              type="password"
              value={password}
              id='input-field'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='universal-button' type="submit">Log In</button>
          <button className='universal-button' onClick={demoUser}>Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
