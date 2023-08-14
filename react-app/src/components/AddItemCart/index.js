import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef, useContext } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'
import { thunkAddItem, thunkEditQuantity, thunkGetCart } from '../../store/cart'
import { FilterCon } from '../../context/FilterContex'

function AddItemCart() {
    const cart = useSelector(state => state.cart.cart)
    const game = useSelector(state => state.games.singleGame)
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const {cartShown, setCartShown} = useContext(FilterCon)
    const quantity = 1

    const onSubmit = async() => {
        const err = await dispatch(thunkAddItem(quantity,gameId))
        await dispatch(thunkGetCart())
    }

    useEffect(async() => {
        let err = await dispatch(thunkGetCart())
    }, [])

    let allReadyInCart = Object.values(cart)
    allReadyInCart = allReadyInCart.filter((item) => {
        return item?.game_id === parseInt(gameId)
    })
    let allReadyInCartConditonal = Object.values(allReadyInCart)

    return (
        <div>
            {allReadyInCart.length < 1 ?<button
            onClick={()=>{
                onSubmit()
                setCartShown(true)
            }}
            >Add to cart</button> : <button
            onClick={async()=>{
                await dispatch(thunkEditQuantity(Number(allReadyInCartConditonal[0].quantity)+1,allReadyInCartConditonal[0].game_id))
                setCartShown(true)
                console.log(cartShown)
            }}
            >Add to cart</button>}
        </div>
    )
}


export default AddItemCart
