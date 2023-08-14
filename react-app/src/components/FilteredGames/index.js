import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFilteredGames } from '../../store/games'
import { FilterCon } from '../../context/FilterContex'
import logo from '../../Images/GAMENIGHTv2.png'
import './filteredgames.css'


function FilteredGames() {
    const {category, setCategory,method, setMethod,maxPlayerValue, setMaxPlayerValue,minPlayerValue, setMinPlayerValue,minAgeValue, setMinAgeValue,maxPriceValue, setMaxPriceValue,cartShown,setCartShown} = useContext(FilterCon)
    const history = useHistory()
    const dispatch = useDispatch()
    const games = useSelector(state => Object.values(state.games.filteredGames))

    useEffect(async() => {
        await dispatch(thunkFilteredGames(category, method, minPlayerValue, maxPlayerValue, minAgeValue, maxPriceValue))
    }, [])

    return (
        <div id='outerdivmappedgames'>
            {games.map((game) => {
                return <div className='outterdivpicgamesfiltered' key={game.id}
                onClick={()=> {
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
                        <div className='innerdivstarsfilteredgameslist'>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <p className='ptagnumberofreviews'>(3) reviews</p>
                        </div>
                        <div className='gamepricecard'>
                            ${game.price}
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}


export default FilteredGames
