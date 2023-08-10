const GET_CART = 'cart/GET_CART'

const getCart = (data) => ({
    type:GET_CART,
    data
})

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
        default:
            return state
    }
}
