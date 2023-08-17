import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { thunkPostReview } from '../../store/reviews'
import { thunkSingleGame } from '../../store/games'
import './reviewform.css'
import StarRatingInput from '../StartRatingInput'

function ReviewForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { gameId } = useParams()
    const [content, setContent] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})

    useEffect(() => {
    }, [])

    let allErrors = Object.values(errors)

    const onChange = (number) => {
        setStars(number);
      };

    const onSubmit = async () => {
        const err = await dispatch(thunkPostReview(content, gameId, stars))
        if (err?.errors?.length > 0) {
            setErrors(err.errors)
        }
        await dispatch(thunkSingleGame(gameId))
    }


    let disable = true
    if (content.length) {
        disable = false
    }

    return (
        <div>
            <div id='outerdivtomakerelativeforstars'>
                <div id='outterdivpostionstarsreviewfor'>
                    <div className="stars">
                        <label className='stars'>
                            <StarRatingInput
                                disabled={false}
                                onChange={onChange}
                                rating={stars}
                            />
                        </label>
                    </div>
                </div>
                <textarea
                    id='textareaforcreatereview'
                    placeholder='Type review here...'
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                />
                <button
                    // disabled={disable}
                    id='submitreviewbutton'
                    onClick={(e) => {
                        onSubmit()
                    }}>Submit Review</button>
            </div>
            <div>
                {allErrors.map((err) => {
                    return <div id='errorscreatingreview'>*{err.split(':')[1]}</div>
                })}
            </div>
            {/* <div id='errorscreatingreview'>rrr{errors[0]?.split(':')[1] ? <p>*{errors[0]?.split(':')[1]}</p> : ''}</div> */}
        </div>
    )
}


export default ReviewForm
