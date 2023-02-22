import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const handleCreate = () => {
		return
	}

	return (
		<ul className='nav-bar'>
			<div className='button-container'>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
				<div>
					{sessionUser && (
						<button onClick={handleCreate}>
							New
						</button>
					)}
					<li>
						<NavLink exact to="/">Home</NavLink>
					</li>
					<li>
						<NavLink exact to="/notes">Notes</NavLink>
					</li>
					<li>
						<NavLink exact to="/notebooks">Notebooks</NavLink>
					</li>
				</div>
			</div>
		</ul>
	);
}

export default Navigation;
