import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { thunkSingleGame } from '../../store/games'
import { useParams } from 'react-router-dom'

function SingleGame() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()

    useEffect(() => {
        dispatch(thunkSingleGame(gameId))
    }, [])

    return (
        <div>
            SingleGame
        </div>
    )
}


export default SingleGame
