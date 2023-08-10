import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkEditReview, thunkSingleReview } from '../../store/reviews'

function EditReview() {
    const review = useSelector(state => state.reviews.review)
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const [content, setContent] = useState(review?.content)

    useEffect(async() => {
        let err = await dispatch(thunkSingleReview(gameId))
    }, [])

    const onSubmit = async() => {
        const err = await dispatch(thunkEditReview(content,gameId))
    }


    let disable = true
    if(content?.length){
        disable=false
     }

    if (!review) {
        return null
    }

    return (
        <div>
            EditReview
            <input type="text"
                value={content?content:review.content}
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


export default EditReview
