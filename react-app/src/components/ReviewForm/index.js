import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import './reviewform.css'
import { thunkPostReview } from '../../store/reviews'

function ReviewForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const [content, setContent] = useState('')

    useEffect(() => {
    }, [])

    const onSubmit = async() => {
        const err = await dispatch(thunkPostReview(content,gameId))
    }

    let disable = true
    if(content.length){
        disable=false
     }

    return (
        <div>
            ReviewFrom
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
    )
}


export default ReviewForm
