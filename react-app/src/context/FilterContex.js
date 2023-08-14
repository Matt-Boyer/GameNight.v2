import React,{ useState } from 'react'

export const FilterCon = React.createContext()

const FilterContext= props => {
    const [category, setCategory] = useState([])
    const [method, setMethod] = useState([])
    const [maxPlayerValue, setMaxPlayerValue] = useState(null)
    const [minPlayerValue, setMinPlayerValue] = useState(null)
    const [minAgeValue, setMinAgeValue] = useState(null)
    const [maxPriceValue, setMaxPriceValue] = useState(null)
    const [cartShown, setCartShown] = useState(false)

    const contextValue = {
        category, setCategory,method, setMethod,maxPlayerValue, setMaxPlayerValue,
        minPlayerValue, setMinPlayerValue,minAgeValue, setMinAgeValue,maxPriceValue, setMaxPriceValue,cartShown, setCartShown
    }
    return (
        <>
        <FilterCon.Provider value={contextValue}>
            {props.children}
        </FilterCon.Provider>
        </>
    )
}


export default FilterContext
