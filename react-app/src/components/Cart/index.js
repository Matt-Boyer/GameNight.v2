import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'
import { thunkGetCart } from '../../store/cart'

function Cart() {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(async() => {
        let err = await dispatch(thunkGetCart())
    }, [])

    return (
        <div>
            Cart
        </div>
    )
}


export default Cart
