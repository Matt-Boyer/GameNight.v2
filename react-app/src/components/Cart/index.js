import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'
import { thunkEditQuantity, thunkGetCart } from '../../store/cart'

function Cart() {
    const cart = useSelector(state => state.cart.cart)
    const history = useHistory()
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState()
    const [gameId, setGameId] = useState()

    let items = Object.values(cart)

    useEffect(async() => {
        let err = await dispatch(thunkGetCart())
    }, [])

    if(!items || !cart || !items.length) {
        return null
    }

    return (
        <div>
            {items?.map((item)=> {
                return <div key={item?.id}>
                    {item?.games?.name}
                   {item&&item.games&& <button
                    onClick={async()=>{
                    await dispatch(thunkEditQuantity(Number(item.quantity)+1,item.id))

                    }}
                    >+</button>}
                    {item?.quantity}
                    {item&&item.games&&<button
                    onClick={async()=>{
                        await dispatch(thunkEditQuantity(Number(item.quantity)-1,item.id))

                        }}
                    >-</button>}
                </div>
            })
            }
        </div>
    )
}


export default Cart
