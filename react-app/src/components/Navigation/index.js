import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FilterCon } from '../../context/FilterContex'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from '../../Images/GAMENIGHTv2.png'
import './Navigation.css';
import { thunkSearchGameName } from '../../store/games';

function Navigation({ isLoaded }) {
	const cart = useSelector(state => state.cart.cart)
	const sessionUser = useSelector(state => state.session.user)
	const { cartShown, setCartShown } = useContext(FilterCon)
	const history = useHistory()
	const dispatch = useDispatch()
	let items = Object.values(cart)
	const [itemsCart, setItemsCart] = useState()
	const [searchByName, setSearchByName] = useState('')

	let nums = items.reduce((accum, item) => {
		return accum + parseInt(item.quantity)
	},0)

	useEffect(() => {
        setItemsCart(nums)
    }, [nums])

	const onSearchByName = async () => {
        await dispatch(thunkSearchGameName(searchByName))
        history.push('/games/filtered')
    }

	return (
		<>
			<div id='navbarmaindiv'>
				<div id='innerdivforlogonavbar'>
					<img id='logofornavbar' src={logo} onClick={() => history.push('/')} />
				</div>
				<div id='outterdivsearchbarforgamesnavbar'>
                    <div id='innerdivsearchbarforgameslandingpage'>
                        <input id='searchbarforgameslandingpage' type="text" placeholder='Search by game name'
						onChange={(e) => {
                            setSearchByName(e.target.value)
                        }}
						onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSearchByName()
                            }
                        }}
						/>
                        <div id='innerdivmagnifyingglasssearchbar'
						onClick={() => {
                            onSearchByName()
                        }}
						>
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
							<div id='numberoncart'>{itemsCart}</div>
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
