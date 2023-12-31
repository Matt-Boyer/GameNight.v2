import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef, useContext } from 'react'
import { thunkSingleGame } from '../../store/games'
import { FilterCon } from '../../context/FilterContex'
import AddItemCart from '../AddItemCart'
import ReviewForm from '../ReviewForm'
import Cart from '../Cart'
import EditReview from '../EditReview'
import StarRatingInput from '../StartRatingInput'
import WishList from '../WishList'
import './singlegame.css'

function SingleGame() {
    const game = useSelector(state => state.games.singleGame)
    const currUser = useSelector(state => state.session.user?.id)
    const { cartShown, setCartShown } = useContext(FilterCon)
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

    const numStars = game.avg_stars
    const starWidth = (game.avg_stars % 1) * 100
    let width3 = `${starWidth}`

    return (
        <div id='maindivsinglegamepage'>
            <div id='outterdivsinglegamepage'>
                <div>
                    <div id='innerdivholdpicofgamesinglegame'>
                        <div id='innermostdivpicofsinglegame'>
                                <img id='picofgamesinglegame' src={game.image} alt="image of game" />
                        </div>
                        <div id='outerrdivpriceadditembutton'>
                            <div id='innerdivpriceadditembutton'>
                                <div>
                                    <h3 id='fontsizegamenamesinglegamepage'>
                                        {game.name}
                                    </h3>
                                </div>
                                <div id='maindivavgstarsreviewsnumber'>
                                    <div id="singlegameavgstarsnexttomainpic">
                                        <div
                                            className={game.avg_stars >= 1 ? "filled" : "empty"}
                                        >
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {numStars > 0 && numStars < 1 ? <i className="fa-sharp fa-solid fa-star" style={{ content: '\f005', position: 'absolute', left: 0, top: 0, width: `${width3}%`, color: 'black', overflow: 'hidden' }}></i> : ''}
                                        </div>
                                        <div
                                            className={game.avg_stars >= 2 ? "filled" : "empty"}
                                        >
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {numStars > 1 && numStars < 2 ? <i className="fa-sharp fa-solid fa-star" style={{ content: '\f005', position: 'absolute', left: 0, top: 0, width: `${width3}%`, color: 'black', overflow: 'hidden' }}></i> : ''}
                                        </div>
                                        <div
                                            className={game.avg_stars >= 3 ? "filled" : "empty"}
                                        >
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {numStars > 2 && numStars < 3 ? <i className="fa-sharp fa-solid fa-star" style={{ content: '\f005', position: 'absolute', left: 0, top: 0, width: `${width3}%`, color: 'black', overflow: 'hidden' }}></i> : ''}
                                        </div>
                                        <div
                                            className={game.avg_stars >= 4 ? "filled" : "empty"}
                                        >
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {numStars > 3 && numStars < 4 ? <i className="fa-sharp fa-solid fa-star" style={{ content: '\f005', position: 'absolute', left: 0, top: 0, width: `${width3}%`, color: 'black', overflow: 'hidden' }}></i> : ''}
                                        </div>
                                        <div
                                            className={game.avg_stars >= 5 ? "filled" : "empty"}
                                        >
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            {numStars > 4 && numStars < 5 ? <i className="fa-sharp fa-solid fa-star" style={{ content: '\f005', position: 'absolute', left: 0, top: 0, width: `${width3}%`, color: 'black', overflow: 'hidden' }}></i> : ''}
                                        </div>
                                    </div>
                                    <div id='divreviewnumberandtext'>
                                        ({reviews.length}) {reviews.length === 1 ? 'review' : 'reviews'}
                                    </div>
                                </div>
                                <div id='outerdivgmaepricesinglegame'>
                                    <div id='innerdivgmaepricesinglegame'>
                                        {/* <div className='halfstartttt'>
                                                <i className="fa-sharp fa-solid fa-star halfstar" ></i>
                                                    <i className="fa-sharp fa-solid fa-star halfstar" style={{ content: '\f005', position: 'absolute', left: 0, top: 0,width:'50%',color:'black',overflow:'hidden' }}></i>
                                        </div> */}
                                        ${game.price}
                                    </div>
                                </div>
                                <div>
                                    {currUser === undefined ? '' : <AddItemCart />}
                                </div>
                                <div id='wishlistdivholdingcomponent'>
                                    <WishList gameId={gameId} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div id='outerdivgamedescriptionsinglegamepage'>
                                <div id='innermaindivgamedescriptionsinglegamepage'>
                                    <div id='descriptiiontextsinglegamepage'>
                                        Description:
                                    </div>
                                    <div id='innerdivgamedescriptionsinglegamepage'>
                                        {game.description}
                                    </div>
                                </div>
                            </div>
                            <div id='maindivreviewsforgap'>
                                {currUser === undefined ? '' : (allreadyReviewed.length < 1 ? <div>
                                    <div id='outerdivcreatereview'>
                                        <div id='innerdivcreatereview'>
                                            <div id='divtextabovereviewinputbox'>
                                                Write a review for this game:
                                            </div>
                                            <div>
                                                <ReviewForm />
                                            </div>
                                        </div></div></div> : <div>
                                    <div id='outerdivcreatereview'>
                                        <div id='innerdivcreatereview'>
                                            <div id='divtextabovereviewinputbox'>
                                                Edit your review:
                                            </div>
                                            <div>
                                                <EditReview />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                                <div id='outerdivallreviews'>
                                    {reviews.length === 0 ? <div id='noreviewssinglegamepage'>Be the first person to write a review about this game!</div>
                                        :
                                        <div id='divreviewstext'>
                                            Reviews:
                                        </div>}
                                    <hr />
                                    {reviews.map((review) => {
                                        return <div key={review.id}>
                                            <div key={review.id} className='outerdivsinglereviewmapped'>
                                                <div id='innerdivusernamereviewsstars'>
                                                    <div id='divusernameformappedreview'>
                                                        {review.username}
                                                    </div>
                                                    <div id="singlegameavgstarsnexttomainpic">
                                                        <div
                                                            className={review.stars >= 1 ? "filled" : "empty"}
                                                        >
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        </div>
                                                        <div
                                                            className={review.stars >= 2 ? "filled" : "empty"}
                                                        >
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        </div>
                                                        <div
                                                            className={review.stars >= 3 ? "filled" : "empty"}
                                                        >
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        </div>
                                                        <div
                                                            className={review.stars >= 4 ? "filled" : "empty"}
                                                        >
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        </div>
                                                        <div
                                                            className={review.stars >= 5 ? "filled" : "empty"}
                                                        >
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='innerdivsinglereviewmapped'>
                                                    {review.content}
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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


export default SingleGame
