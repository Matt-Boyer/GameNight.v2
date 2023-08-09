const POST_REVIEW = 'reviews/POST_REVIEW'

const postReview = (data) => ({
    type:POST_REVIEW,
    data
})

export const thunkPostReview = (content,gameId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new/${gameId}`, {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content})
    })
    if (response.ok)    {
        const review = await response.json()
        dispatch(postReview(review))
        return review
    }
    else if (response.status < 500){
    const err = await response.json()
    return err
}
}


const initialState = { review:{} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case POST_REVIEW: {
            let newState = {...state, review:{...state.review}}
            newState.review = {}
            newState.review = action.data
            return newState
        }
        default:
            return state
    }
}
