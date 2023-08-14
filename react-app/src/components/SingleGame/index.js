import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef, useContext } from 'react'
import { thunkSingleGame } from '../../store/games'
import { FilterCon } from '../../context/FilterContex'
import AddItemCart from '../AddItemCart'
import ReviewForm from '../ReviewForm'
import './singlegame.css'
import Cart from '../Cart'
import EditReview from '../EditReview'

function SingleGame() {
    const game = useSelector(state => state.games.singleGame)
    const currUser = useSelector(state => state.session.user?.id)
    const {cartShown, setCartShown} = useContext(FilterCon)
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()

    useEffect(() => {
        dispatch(thunkSingleGame(gameId))
    }, [])


    const shortCircuit = Object.values(game)
    if (shortCircuit.length < 1) {
        return null
    }
    let reviews = Object.values(game.reviews)
    reviews = reviews.reverse()

    let allreadyReviewed = reviews.filter((review) => {
        return review.user_id === currUser
    })
    allreadyReviewed = Object.values(allreadyReviewed)

    return (
        <div id='maindivsinglegamepage'>
            <div id='outterdivsinglegamepage'>
                <div>
                    <div id='innerdivholdpicofgamesinglegame'>
                        <img id='picofgamesinglegame' src={game.image} alt="image of game" />
                    </div>
                    <div>
                        <div>
                            <div>
                                Description:
                            </div>
                            <div>
                                {game.description}
                            </div>
                            <div>
                                {currUser === undefined ? '' : (allreadyReviewed.length < 1 ? <div>
                                    <div>
                                        Create a review
                                    </div>
                                    <div>
                                        <ReviewForm />
                                    </div>
                                </div> : <div>
                                    <div>
                                        Edit your review
                                    </div>
                                    <div>
                                    <EditReview />
                                    </div>
                                </div>
                                )}
                                <div>
                                    Reviews:
                                </div>
                                {reviews.map((review) => {
                                    return <div key={review.id}>
                                        <div>
                                            {review.content}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div id='outerrdivpriceadditembutton'>
                    <div id='innerdivpriceadditembutton'>
                        <div>
                            ${game.price}
                        </div>
                        <div>
                            {currUser === undefined ? '' : <AddItemCart />}
                        </div>
                    </div>
                </div>
            </div>
            <div id={cartShown? 'outerdivcartsinglepagetrue' : 'outerdivcartsinglepagefalse'} >
                {currUser === undefined ? null : <Cart />}
            </div>
        </div>
    )
}


export default SingleGame
