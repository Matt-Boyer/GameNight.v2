import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFilteredGames } from '../../store/games'
import { FilterCon } from '../../context/FilterContex'
import logo from '../../Images/GAMENIGHTv2.png'
import './filteredgames.css'
import Cart from '../Cart'


function FilteredGames() {
    const currUser = useSelector(state => state.session.user?.id)
    const { category, setCategory, method, setMethod, maxPlayerValue, setMaxPlayerValue, minPlayerValue, setMinPlayerValue, minAgeValue, setMinAgeValue, maxPriceValue, setMaxPriceValue, cartShown, setCartShown } = useContext(FilterCon)
    const history = useHistory()
    const dispatch = useDispatch()
    const games = useSelector(state => Object.values(state.games.filteredGames))

    useEffect(async () => {
        await dispatch(thunkFilteredGames(category, method, minPlayerValue, maxPlayerValue, minAgeValue, maxPriceValue))
    }, [])

    return (
        <div id='maindivfilteredgames'>
            <div id='outerdivmappedgames'>
                {games.map((game) => {
                    return <div className='outterdivpicgamesfiltered' key={game.id}
                        onClick={() => {
                            history.push(`/game/${game.id}`)
                        }}
                    >
                        <div className='outterdivcardfilteredgame'>
                            <div className='innerdivpicofgamefilteredgames'>
                                <img className='picofgamefilteredgames' src={game.image} alt="image of game" />
                            </div>
                            <div className='divholdinggametagforspacingawayfrompic'>
                                <h4 className='gamenameh4tag'>{game.name}</h4>
                            </div>
                            <div id="singlegameavgstarsnexttomainpic">
                                <div
                                    className={game.avg_stars >= 1 ? "filled" : "empty"}
                                >
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <div
                                    className={game.avg_stars >= 2 ? "filled" : "empty"}
                                >
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <div
                                    className={game.avg_stars >= 3 ? "filled" : "empty"}
                                >
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <div
                                    className={game.avg_stars >= 4 ? "filled" : "empty"}
                                >
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <div
                                    className={game.avg_stars >= 5 ? "filled" : "empty"}
                                >
                                    <i className="fa-sharp fa-solid fa-star"></i>
                                </div>
                                <div id='divreviewnumberandtext'>
                                    ({game.reviews.length}) {game.reviews.length === 1 ? 'review' : 'reviews'}
                                </div>
                            </div>
                            <div className='gamepricecard'>
                                ${game.price}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div id={cartShown ? 'outerdivcartsinglepagetrue' : 'outerdivcartsinglepagefalse'} >
                {currUser === undefined ? null : <Cart />}
            </div>
        </div>
    )
}


export default FilteredGames
