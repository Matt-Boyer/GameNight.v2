const FILTERED_GAMES = 'games/FILTERED_GAMES'
const SINGLE_GAME = 'games/SINGLE_GAME'
const SEARCH_GAME_NAME = 'games/SEARCH_GAME_NAME'
const REFRESHED_FILTERED_GAMES = 'games/REFRESHED_FILTERED_GAMES'

const fileterdGames = (data) => ({
    type:FILTERED_GAMES,
    data
})

const refreshedFilteredGames = (data) => ({
    type:REFRESHED_FILTERED_GAMES,
    data
})

const searchGameName = (data) => ({
    type:SEARCH_GAME_NAME,
    data
})

const singleGame = (data) => ({
    type:SINGLE_GAME,
    data
})

export const thunkSingleGame = (gameId) => async(dispatch) => {
    const res = await fetch(`/api/games/${gameId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
		},
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(singleGame(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkFilteredGames = (category,method,minPlayer,maxPlayer,minAge,price) => async(dispatch) => {
    const res = await fetch(`/api/games/filtered`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Category":`${category}`,
            "Method": `${method}`,
            "MinPlayer": `${minPlayer}`,
            "MaxPlayer": `${maxPlayer}`,
            "MinAge": `${minAge}`,
            "Price": `${price}`
		},
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(fileterdGames(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkRefreshedGames = (gameIds) => async(dispatch) => {
    const res = await fetch(`/api/games/refreshedgamesfiltered`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "GameIds":`${gameIds}`
		},
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(fileterdGames(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkSearchGameName = (searchInput) => async(dispatch) => {
    const res = await fetch(`/api/games/searchgamename`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "SearchInput":`${searchInput}`
		},
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(fileterdGames(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

const initialState = { filteredGames:{}, singleGame:{} };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FILTERED_GAMES: {
            let newState = {...state, filteredGames:{...state.filteredGames}}
            newState.filteredGames = {}
            action.data.forEach(ele => {
                newState.filteredGames[ele.id]= ele
            });
            return newState
        }
        case SINGLE_GAME: {
            let newState = {...state, singleGame:{...state.singleGame}}
            newState.singleGame = {}
            newState.singleGame = action.data
            return newState
        }
        default:
            return state
    }
}
