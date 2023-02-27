import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import CreateNote from '../CreateNote';
import CreateNotebook from '../CreateNotebook'
import './Navigation.css';



function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-bar'>
			<div className='button-container'>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>

				)}
				<div id='component-buttons'>
					<div id='component-buttons-one'>
						{sessionUser && <OpenModalButton
							buttonText="New Note"
							className=""
							modalComponent={<CreateNote />}>
						</OpenModalButton>}
						{sessionUser && <OpenModalButton
							buttonText="New Notebook"
							modalComponent={<CreateNotebook />}>
						</OpenModalButton>}
					</div>
					<div id='component-buttons-two'>
						{sessionUser && <li>
							<NavLink exact to="/home">Home</NavLink>
						</li>}
						{sessionUser && <li>
							<NavLink exact to="/notes">Notes</NavLink>
						</li>}
						{sessionUser && <li>
							<NavLink exact to="/notebooks">Notebooks</NavLink>
						</li>}
					</div>
				</div>
			</div>
		</ul>
	);
}

export default Navigation;
