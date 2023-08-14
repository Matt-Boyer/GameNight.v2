import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkPostReview } from '../../store/reviews'
import { thunkSingleGame } from '../../store/games'
import './reviewform.css'

function ReviewForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
    }, [])

    const onSubmit = async() => {
        const err = await dispatch(thunkPostReview(content,gameId))
        if (err.errors?.length > 0) {
            setErrors(err.errors)
        }
        await dispatch(thunkSingleGame(gameId))
    }
    

    let disable = true
    if(content.length){
        disable=false
     }

    return (
        <div>
            <div>
            <input type="text"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            />
            <button disabled={disable}
                onClick={(e) => {
                    onSubmit()
                }}>Submit</button>
            </div>
            <div>{errors[0]?.split(':')[1] ? <p>{errors[0]?.split(':')[1]}</p> : ''}</div>
        </div>
    )
}


export default ReviewForm
