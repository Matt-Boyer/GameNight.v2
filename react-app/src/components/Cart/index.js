import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'
import { thunkEditQuantity, thunkGetCart } from '../../store/cart'
import './cart.css'
import CheckoutPopUp from '../CheckoutPopUp'

function Cart() {
    const cart = useSelector(state => state.cart.cart)
    const history = useHistory()
    const dispatch = useDispatch()
    const [checkedOut, setCheckedOut] = useState(false)
    const [gameId, setGameId] = useState()

    let items = Object.values(cart)

    const onCheckout = async () => {
        items.forEach(async (item) => {
            await dispatch(thunkEditQuantity(0, item.game_id))
            setCheckedOut(true)
        });
    }

    useEffect(async () => {
        let err = await dispatch(thunkGetCart())
    }, [])

    let totalPrice = items?.reduce((accum, item2) => {
        return accum + (parseFloat(item2?.games?.price) * parseInt(item2?.quantity))
    }, 0)

    totalPrice = Number.parseFloat(totalPrice).toFixed(2)

    // if (!items || !cart || !items.length) {
    //     return null
    // }

    return (
        <div id='maindivcartpositioning'>
            <div id='outerdivholdingcart'>
                <div>
                    {checkedOut && <CheckoutPopUp setCheckedOut={setCheckedOut} />}
                </div>
                <div id='outerdivallgamesincart'>
                    {/* was using this below in additon    items && */}
                    {items.length > 0 ? (items?.map((item, idx) => {
                        return <>
                        <div key={idx} className='innerdivcartgamename'>
                            <div className='divimageincartofgame'>
                                <img className='imageincartofgame' src={item.games.image} alt="small image of game" />
                            </div>
                            <div className='divholdinggamenameincart'>
                            {item?.games?.name}
                            </div>
                            {item && item.games && <div> <button
                            className='addorsubtractcartbutton'
                                onClick={async () => {
                                    await dispatch(thunkEditQuantity(Number(item.quantity) + 1, item.game_id))

                                }}
                            >+</button> </div>}
                            {item?.quantity}
                            {item && item.games && <div> <button
                            className='addorsubtractcartbutton'
                                onClick={async () => {
                                    await dispatch(thunkEditQuantity(Number(item.quantity) - 1, item.game_id))

                                }}
                            >-</button> </div>}
                        </div>
                        <hr />
                        </>
                    })
                    ) : <div>Empty Cart</div>}
                </div>
                <div id='carttotalcheckoutbutton'>
                    <div id='innerdivtotalprice'>
                        Total: ${totalPrice}
                    </div>
                    <div>
                        {items.length > 0 && <button
                            onClick={async () => {
                                await onCheckout()
                            }}
                        >Checkout</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Cart
