import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FilterCon } from '../../context/FilterContex'
import logo from '../../Images/GAMENIGHTv2.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)
	const {cartShown, setCartShown} = useContext(FilterCon)
	const history = useHistory()

	return (
		<>
			<div id='navbarmaindiv'>
				<div id='innerdivforlogonavbar'>
					<img id='logofornavbar' src={logo} onClick={() => history.push('/')} />
				</div>
				{isLoaded && (
					<div id='divprofileshoppingcart'>
						<div>
							<ProfileButton user={sessionUser} />
						</div>
						<div onClick={() => {
							setCartShown(!cartShown)
						}}>
							<i className="fa-solid fa-cart-shopping"></i>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
