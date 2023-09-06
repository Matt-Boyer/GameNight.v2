import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { FilterCon } from '../../context/FilterContex'
import { thunkAddWISHLIST, thunkGetWishList, thunkDeleteWishList } from "../../store/wishlist";
import WishListRemove from "../WishListRemove";
import Cart from '../Cart'
import './wishlistpage.css';

function WishListPage() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { cartShown, setCartShown } = useContext(FilterCon)
    const wishlist = useSelector(state => Object.values(state.wishlist.wishlist))
    const currUser = useSelector(state => state.session.user?.id)

    useEffect(() => {
        dispatch(thunkGetWishList())
    }, [])

    return (
        <div id="wishlistoutterdiv">
            <div id="wishlistheader">
                WISH LIST
            </div>
            <div id='outerdivmappedgames'>
                {wishlist.map((game) => {
                    return <div id="positioningforremovewishlistbutton" key={game.id}>
                        <div className='outterdivpicgamesfiltered' key={game.id}
                            onClick={() => {
                                history.push(`/game/${game.game_id}`)
                            }}
                        >
                            <div className='outterdivcardfilteredgame'>
                                <div className='innerdivpicofgamefilteredgames'>
                                    <img className='picofgamefilteredgames' src={game.games.image} alt="image of game" />
                                </div>
                                <div className='divholdinggametagforspacingawayfrompic'>
                                    <h4 className='gamenameh4tag'>{game.games.name}</h4>
                                </div>
                                <div id="singlegameavgstarsnexttomainpic">
                                    <div
                                        className={game.games.avg_stars >= 1 ? "filled" : "empty"}
                                    >
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <div
                                        className={game.games.avg_stars >= 2 ? "filled" : "empty"}
                                    >
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <div
                                        className={game.games.avg_stars >= 3 ? "filled" : "empty"}
                                    >
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <div
                                        className={game.games.avg_stars >= 4 ? "filled" : "empty"}
                                    >
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <div
                                        className={game.games.avg_stars >= 5 ? "filled" : "empty"}
                                    >
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                    </div>
                                    <div id='divreviewnumberandtext'>
                                        ({game.games.reviews.length}) {game.games.reviews.length === 1 ? 'review' : 'reviews'}
                                    </div>
                                </div>
                                <div className='gamepricecard'>
                                    ${game.games.price}
                                </div>
                            </div>
                        </div>
                        <div>
                            <WishListRemove gameId={game.game_id} />
                        </div>
                    </div>
                })}
            </div>
                        <div id={cartShown ? 'outerdivcartsinglepagetrue' : 'outerdivcartsinglepagefalse'} >
                            {currUser === undefined ? null : <Cart />}
                        </div>
                        {cartShown && <div id='divtomakecartdisappear'
                            onClick={() => {
                                setCartShown(false)
                            }}
                        >

                        </div>}
        </div>
    );
}

export default WishListPage;
