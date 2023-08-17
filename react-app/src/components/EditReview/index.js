import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkEditReview, thunkSingleReview } from '../../store/reviews'
import { thunkSingleGame } from '../../store/games'
import { thunkGetCart } from '../../store/cart'
import DeleteReview from '../DeleteReview'
import './editreview.css'
import StarRatingInput from '../StartRatingInput'

function EditReview() {
    const review = useSelector(state => state.reviews.review)
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const [content, setContent] = useState(review?.content)
    const [stars, setStars] = useState(review?.stars)
    const [errors, setErrors] = useState({})

    useEffect(async() => {
        let err = await dispatch(thunkSingleReview(gameId))
    }, [])

    const onSubmit = async() => {
        const err = await dispatch(thunkEditReview(content,gameId,stars))
        if (err?.errors?.length > 0) {
            setErrors(err.errors)
        }
        await dispatch(thunkSingleGame(gameId))
        await dispatch(thunkGetCart())
    }

    const onChange = (number) => {
        setStars(number);
    };

    let disable = true
    if(content?.length){
        disable=false
     }

    if (!review ) {
        return null
    }

    return (
        <div id='divforpositioningstarsrelative'>
            <div id='deletereviewbutton'>
                <DeleteReview />
            </div>
             <div id='outterdivpostionstarsreviewfor'>
                    <div className="stars">
                        <label className='stars'>
                            {<StarRatingInput
                                disabled={false}
                                onChange={onChange}
                                rating={stars}
                            />}
                        </label>
                    </div>
                </div>
            <div>
            <textarea
                id='textareaforcreatereview'
                value={content?content:review.content}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
            />
            <button disabled={disable}
                id='submitreviewbutton'
                onClick={(e) => {
                    onSubmit()
                }}>Submit</button>
            </div>
            <div>{errors[0]?.split(':')[1] ? <p>{errors[0]?.split(':')[1]}</p> : ''}</div>
        </div>
    )
}


export default EditReview
