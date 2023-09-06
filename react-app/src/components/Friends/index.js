
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './friends.css'



function Friends() {
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div>
            <div id='friendslistheader'>
                Friends
            </div>
        </div>
    )
}


export default Friends
