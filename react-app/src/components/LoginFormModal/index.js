import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()
  const demoUser = () => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

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
