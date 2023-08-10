import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkDeleteReview } from '../../store/reviews'

function DeleteReview() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()

    const onSubmit = async() => {
        const err = await dispatch(thunkDeleteReview(gameId))
    }

    return (
        <div>
            DeleteReview
            <button
                onClick={(e) => {
                    onSubmit()
                }}>Delete</button>
        </div>
    )
}


export default DeleteReview
