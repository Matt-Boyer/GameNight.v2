const GET_CART = 'cart/GET_CART'
const ADD_ITEM = 'cart/ADD_ITEM'
const EDIT_QUANTITY = 'cart/EDIT_QUANTITY'

const getCart = (data) => ({
    type:GET_CART,
    data
})

const addItem = (data) => ({
    type:ADD_ITEM,
    data
})

const editQuantity = (data) => ({
    type:EDIT_QUANTITY,
    data
})

export const thunkEditQuantity = (quantity,gameId) => async (dispatch) => {
    const response = await fetch(`/api/cart/edit/${gameId}`, {
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({quantity})
    })
    if (response.ok)    {
        const item = await response.json()
        dispatch(editQuantity(item))
        dispatch(thunkGetCart())
        return item
    }
    else if (response.status < 500){
    const err = await response.json()
    return err
}
}

export const thunkAddItem = (quantity, gameId) => async (dispatch) => {
    const response = await fetch(`/api/cart/add/${gameId}`, {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({quantity})
    })
    if (response.ok)    {
        const item = await response.json()
        dispatch(addItem(item))
        return item
    }
    else if (response.status < 500){
    const err = await response.json()
    return err
    }
}

export const thunkGetCart = () => async(dispatch) => {
    const res = await fetch(`/api/cart/all`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getCart(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

const initialState = { cart:{} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART: {
            let newState = {...state, cart:{...state.cart}}
            newState.cart = {}
            action.data.forEach(ele => {
                newState.cart[ele.id]= ele
            });
            return newState
        }
        case ADD_ITEM: {
            let newState = {...state, cart:{...state.cart}}
            newState.cart = {}
            newState.cart = action.data
            return newState
        }
        case EDIT_QUANTITY: {
            const newState = {...state, cart:{...state.cart}}
            newState.cart = {}
            newState.cart = action.data
            return newState
        }
        default:
            return state
    }
}
