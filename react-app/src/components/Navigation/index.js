import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
				<div>
					{sessionUser && <li>
						<NavLink exact to="/notes/new">New Note</NavLink>
					</li>}
					{sessionUser && <li>
						<NavLink exact to="/">Home</NavLink>
					</li>}
					{ sessionUser && <li>
						<NavLink exact to="/notes">Notes</NavLink>
					</li>}
					{sessionUser && <li>
						<NavLink exact to="/notebooks">Notebooks</NavLink>
					</li>}
				</div>
			</div>
		</ul>
	);
}

export default Navigation;
