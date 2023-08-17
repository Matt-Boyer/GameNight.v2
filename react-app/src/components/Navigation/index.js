import React, { useState, useContext } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FilterCon } from '../../context/FilterContex'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from '../../Images/GAMENIGHTv2.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)
	const { cartShown, setCartShown } = useContext(FilterCon)
	const history = useHistory()

	return (
		<>
			<div id='navbarmaindiv'>
				<div id='innerdivforlogonavbar'>
					<img id='logofornavbar' src={logo} onClick={() => history.push('/')} />
				</div>
				<div id='outterdivsearchbarforgamesnavbar'>
                    <div id='innerdivsearchbarforgameslandingpage'>
                        <input id='searchbarforgameslandingpage' type="text" placeholder='Search by game name -- FEATURE COMING SOON' />
                        <div id='innerdivmagnifyingglasssearchbar'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
				{isLoaded && (
					sessionUser?.id ? <div id='divprofileshoppingcart'>
						<div>
							<ProfileButton user={sessionUser} />
						</div>
						<div onClick={() => {
							setCartShown(!cartShown)
						}}>
							<i className="fa-solid fa-cart-shopping"></i>
						</div>
					</div>
						: <div id='divprofileshoppingcart'>
							{/* <div className='loginsignupnavbarbutton'> */}
								<OpenModalButton
									buttonText="Log In"
									modalComponent={<LoginFormModal />}
								/>
							{/* </div> */}
							{/* <div className='loginsignupnavbarbutton'> */}
								<OpenModalButton
									buttonText="Sign Up"
									modalComponent={<SignupFormModal />}
								/>
							{/* </div> */}
						</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
