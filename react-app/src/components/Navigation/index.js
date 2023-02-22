import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import CreateNote from '../CreateNote';

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
						<OpenModalButton
							buttonText="New"
							onItemClick={handleCreate}
							modalComponent={<CreateNote />}
						/>
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
