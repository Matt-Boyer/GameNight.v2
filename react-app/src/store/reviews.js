const POST_REVIEW = 'reviews/POST_REVIEW'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'
const SINGLE_REVIEW = 'reviews/SINGLE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const postReview = (data) => ({
    type:POST_REVIEW,
    data
})

const deleteReview = (gameId) => ({
    type:DELETE_REVIEW,
    data:gameId
})

const editReview = (data) => ({
    type:EDIT_REVIEW,
    data
})

const singleReview = (data) => ({
    type:SINGLE_REVIEW,
    data
})

export const thunkSingleReview = (gameId) => async(dispatch) => {
    const res = await fetch(`/api/reviews/single/${gameId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(singleReview(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkPostReview = (content,gameId,stars) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new/${gameId}`, {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content,stars})
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

export const thunkDeleteReview = (gameId) => async (dispatch) => {
        const res = await fetch(`/api/reviews/delete/${gameId}`, {
            method:'DELETE'
        })
        if (res.ok)    {
            const data = await res.json()

            dispatch(deleteReview(data))
            return data
        }else {
                const err = await res.json()
                return {errors:err}
            }
}

export const thunkEditReview = (content,gameId,stars) => async (dispatch) => {
    const response = await fetch(`/api/reviews/edit/${gameId}`, {
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({content,stars})
    })
    if (response.ok)    {
        const review = await response.json()
        dispatch(editReview(review))
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
        case EDIT_REVIEW: {
            const newState = {...state, review:{...state.review}}
            newState.review = {}
            newState.review = action.data
            return newState
        }
        case DELETE_REVIEW: {
            const newState = {...state, review:{...state.review}}
            delete newState.review
            return newState
        }
        case SINGLE_REVIEW: {
            let newState = {...state, review:{...state.review}}
            newState.review = {}
            newState.review = action.data
            return newState
        }
        default:
            return state
    }
}
