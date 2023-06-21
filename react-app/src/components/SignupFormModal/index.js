import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const ulRef = useRef();
	const newDropdownRef = useRef(null)
	const sessionUser = useSelector(state => state.session.user);
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

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
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, firstName, lastName, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/home')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div id='e-circle-logo-modal'>
					<i class="fa-solid fa-e" style={{ display: 'flex', justifyContent: 'center' }}></i>
				</div>
			</div >
			<div id='account-already-made' style={{ textAlign: 'center' }}>
				<OpenModalButton
					buttonText="Already have an account? Log in"
					onItemClick={closeMenu}
					modalComponent={<LoginFormModal />}
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
						First Name*
						<input
							type="text"
							value={firstName}
							id='input-field'
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
					<label>
						Last Name*
						<input
							type="text"
							value={lastName}
							id='input-field'
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
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
						Username*
						<input
							type="text"
							value={username}
							id='input-field'
							onChange={(e) => setUsername(e.target.value)}
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
					<label>
						Confirm Password*
						<input
							type="password"
							value={confirmPassword}
							id='input-field'
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button type="submit" className="universal-button">Sign Up</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;
