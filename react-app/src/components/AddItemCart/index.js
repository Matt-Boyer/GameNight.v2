import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'
import { thunkAddItem, thunkGetCart } from '../../store/cart'

function AddItemCart() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const quantity = 1

    const onSubmit = async() => {
        const err = await dispatch(thunkAddItem(quantity,gameId))
    }

    return (
        <div>
            <button
            onClick={()=>{
                onSubmit()
            }}
            >AddItem</button>
        </div>
    )
}


export default AddItemCart
