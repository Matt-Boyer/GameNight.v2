import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkDeleteReview } from '../../store/reviews'
import { thunkSingleGame } from '../../store/games'
import './deletereview.css'

function DeleteReview() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()

    const onSubmit = async() => {
        const err = await dispatch(thunkDeleteReview(gameId))
        dispatch(thunkSingleGame(gameId))
    }

    return (
        <div>
            <button
            id='deletereviewbutton'
                onClick={(e) => {
                    onSubmit()
                }}>Delete Review</button>
        </div>
    )
}


export default DeleteReview
