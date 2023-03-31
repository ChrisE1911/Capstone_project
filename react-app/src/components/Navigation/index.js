import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import CreateNote from '../CreateNote';
import CreateNotebook from '../CreateNotebook'
import './Navigation.css';



function Navigation({ isLoaded }) {
	const history = useHistory()
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
						{sessionUser && <li>
							<NavLink exact to="/tasks">Tasks</NavLink>
						</li>}
					</div>
				</div>
				<div id='about-me-links'>
					<div id='logo-filler'>
						{!sessionUser && <div id='splash-page-h1-nav'>ETERNAL NOTE</div>}
					</div>
					<div id='indiv-button'>
						{!sessionUser && <div>My Github</div>}
						<Link to={{ pathname: "https://github.com/ChrisE1911" }}
							target='_blank'
							className='about-me-button-github'>
							{!sessionUser && <img src='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' style={{ width: '100px', height: '100px' }}></img>}
						</Link>
					</div>
					<div id='indiv-button'>
						{!sessionUser && <div>
							My LinkedIn
						</div>}
						<Link
							to={{ pathname: "https://www.linkedin.com/in/christopher-eatmon-b6a0aa17b" }}
							target='_blank'
							className='about-me-button-linkedin'>
							{!sessionUser && <img src='https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-dhkaf9ri.png' style={{ width: '100px', height: '100px' }}></img>}
						</Link>
					</div>


				</div>
			</div>
		</ul>
	);
}

export default Navigation;
