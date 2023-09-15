const GET_WISHLIST = 'wishlist/GET_WISHLIST'
const ADD_WISHLIST = 'wishlist/ADD_WISHLIST'
const DELETE_WISHLIST = 'wishlist/DELETE_WISHLIST'

const getWishList = (data) => ({
    type:GET_WISHLIST,
    data
})

const addWishList = (data) => ({
    type:ADD_WISHLIST,
    data
})

const deleteWishList = (data) => ({
    type:DELETE_WISHLIST,
    data
})

export const thunkDeleteWishList = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/delete/${gameId}`, {
        method:'DELETE'
    })
    if (response.ok)    {
        const wishlist = await response.json()
        dispatch(deleteWishList(wishlist))
        // dispatch(getWishList())
        return wishlist
    }
    else if (response.status < 500){
    const err = await response.json()
    return err
}
}

export const thunkAddWISHLIST = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/add/${gameId}`, {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({})
    })
    if (response.ok)    {
        const item = await response.json()
        // dispatch(addItem(item))
        dispatch(thunkGetWishList())
        return item
    }
    else if (response.status < 500){
    const err = await response.json()
    return err
    }
}

export const thunkGetWishList = () => async(dispatch) => {
    const res = await fetch(`/api/wishlist/all`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getWishList(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

const initialState = { wishlist:{} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WISHLIST: {
            let newState = {...state, wishlist:{...state.wishlist}}
            newState.wishlist = {}
            action.data.forEach(ele => {
                newState.wishlist[ele.game_id]= ele
            });
            return newState
        }
        case DELETE_WISHLIST: {
            const newState = {...state, wishlist:{...state.wishlist}}
            delete newState.wishlist[action.data.deleted]
            return newState
        }
        default:
            return state
    }
}
