import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFilteredGames, thunkRefreshedGames } from '../../store/games'
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
    const [selectedFilter, setSelectedFilter] = useState(0)
    const [gamesRefreshed, setGamesRefreshed] = useState('')

    // useEffect(async () => {
    //     await dispatch(thunkFilteredGames(category, method, minPlayerValue, maxPlayerValue, minAgeValue, maxPriceValue))
    // }, [])

    const gameIds = games.map((game) => {
        return game.id
    })

    useEffect(() => {
        const saved = localStorage.getItem('name')
        const savedParsed = JSON.parse(saved)

        if (games.length > 0) {
            localStorage.setItem("name", JSON.stringify(`${gameIds}`))
            dispatch(thunkRefreshedGames(savedParsed))
        }
        else {
            dispatch(thunkRefreshedGames(savedParsed))
        }
        return () => localStorage.removeItem("name")
      }, []);

    let sortedGamesRatingsHtoL = games.toSorted((a,b) => b.avg_stars - a.avg_stars)
    let sortedGamesRatingsLtoH = games.toSorted((a,b) => a.avg_stars - b.avg_stars)
    let sortedGamesReviewsHtoL = games.toSorted((a,b) => b.reviews.length - a.reviews.length)
    let sortedGamesReviewsLtoH = games.toSorted((a,b) => a.reviews.length - b.reviews.length)

    let gamesToMap = () => {
        if (selectedFilter === 0) {return games}
        if (selectedFilter === 'ratinghtol') {return sortedGamesRatingsHtoL}
        if (selectedFilter === 'reviewshtol') {return sortedGamesReviewsHtoL}
        if (selectedFilter === 'ratingltoh') {return sortedGamesRatingsLtoH}
        if (selectedFilter === 'reviewsltoh') {return sortedGamesReviewsLtoH}
    }

    return (
        <div id='maindivfilteredgames'>
            <div id='outerdivsortbyfilteredgamespage'>
                <div id='sortbytextfilteredgames'>Sort by :</div>
                <div className='innerdivsortbyfilteredgamespage'>
                    <div onClick={() => {setSelectedFilter('ratinghtol')}} className={selectedFilter === 'ratinghtol' ? 'textsortby rating' : 'textsortby'}>Rating: High to Low</div>
                </div>
                 <div className='innerdivsortbyfilteredgamespage'>
                    <div onClick={() => {setSelectedFilter('ratingltoh')}} className={selectedFilter === 'ratingltoh' ? 'textsortby rating' : 'textsortby'}>Rating: Low to High</div>
                </div>
                <div className='innerdivsortbyfilteredgamespage'>
                    <div onClick={() => {setSelectedFilter('reviewshtol')}} className={selectedFilter === 'reviewshtol' ?'textsortby reviews' :'textsortby'}>Reviews: Most to Least</div>
                </div>
                <div className='innerdivsortbyfilteredgamespage'>
                    <div onClick={() => {setSelectedFilter('reviewsltoh')}} className={selectedFilter === 'reviewsltoh' ?'textsortby reviews' :'textsortby'}>Reviews: Least to Most</div>
                </div>
            </div>
            <div id='outerdivmappedgames'>
                {(gamesToMap()).map((game) => {
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
            {cartShown && <div id='divtomakecartdisappear'
                onClick={() => {
                    setCartShown(false)
                }}
            >

            </div>}
        </div>
    )
}


export default FilteredGames
