import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../Images/GameNIGHT.png'
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	return (
		<div id='navbarmaindiv'>
			<div>
				<img id='logofornavbar' src={logo} onClick={()=>history.push('/')} />
			</div>
			<div>
                <div id='innerdivsearchbarforgameslandingpage'>
                    <input id='searchbarforgameslandingpage' type="text" placeholder='Search by game name' />
                </div>
            </div>
			{isLoaded && (
				<div id='divprofileshoppingcart'>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
				<div>
				<i className="fa-solid fa-cart-shopping"></i>
								</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
