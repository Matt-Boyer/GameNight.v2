import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './filteredgames.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkFilteredGames } from '../../store/games'


function FilteredGames() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const [method, setMethod] = useState([])
    const [isShown, setIsShown] = useState(false)
    const [isShownMethod, setIsShownMethod] = useState(false)

    const onSubmit = async () => {
        let err = await dispatch(thunkFilteredGames(category, method))
    }

    //NEED TO ACCOUNT FOR IF THEY DONT SELECT ANYTHING ON FILTER MAKE ALL BE SELECTED OR SEOMTHING LIKE THAT

    useEffect(() => {
    }, [])

    return (
        <div>
            <div>
                <div id='divforfiltersearchbarlandingpage'>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className='categoryanddownarrowfiltersearch'
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Categoy</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                            >
                                <div className={isShown ? 'innerdivholdingfilter' : 'innerdivholdingfilter hiddenforfilterlandgingpage'}>
                                    <div>
                                        <label htmlFor="Adult/Drinking Games">Adult/Drinking Games:</label>
                                        <input className='gapforinputfilter' value={1} name='Adult/Drinking Games' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(1) < 0) { setCategory((category) => [...category, 1]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(1), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Family/Kids">Family/Kids:</label>
                                        <input className='gapforinputfilter' value={2} name='Family/Kids' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(2) < 0) { setCategory((category) => [...category, 2]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(2), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Competitive">Competitive:</label>
                                        <input className='gapforinputfilter' value={3} name='Competitive' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(3) < 0) { setCategory((category) => [...category, 3]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(3), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Strategy">Strategy:</label>
                                        <input className='gapforinputfilter' value={4} name='Strategy' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(4) < 0) { setCategory((category) => [...category, 4]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(4), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Adventure">Adventure:</label>
                                        <input className='gapforinputfilter' value={5} name='Adventure' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(5) < 0) { setCategory((category) => [...category, 5]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(5), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Shooter">Shooter:</label>
                                        <input className='gapforinputfilter' value={6} name='Shooter' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(6) < 0) { setCategory((category) => [...category, 6]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(6), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Racing">Racing:</label>
                                        <input className='gapforinputfilter' value={7} name='Racing' type='checkbox'
                                            onChange={() => {
                                                if (category.indexOf(7) < 0) { setCategory((category) => [...category, 7]) }
                                                else { setCategory(prevCategory => [...prevCategory.toSpliced(category.indexOf(7), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className='categoryanddownarrowfiltersearch'
                            onMouseEnter={() => setIsShownMethod(true)}
                            onMouseLeave={() => setIsShownMethod(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Method</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div
                                className='maindivholdingfilter'
                                onMouseEnter={() => setIsShownMethod(true)}
                                onMouseLeave={() => setIsShownMethod(false)}
                            >
                                <div className={isShownMethod ? 'innerdivholdingfilter' : 'innerdivholdingfilter hiddenforfilterlandgingpage'} >
                                    <div>
                                        <label htmlFor="Computer">Computer:</label>
                                        <input className='gapforinputfilter' value={1} name='Computer' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(1) < 0) { setMethod((method) => [...method, 1]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(1), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Board Game">Board Game:</label>
                                        <input className='gapforinputfilter' value={2} name='Board Game' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(2) < 0) { setMethod((method) => [...method, 2]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(2), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Cards">Cards:</label>
                                        <input className='gapforinputfilter' value={3} name='Cards' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(3) < 0) { setMethod((method) => [...method, 3]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(3), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="PS5">PS5:</label>
                                        <input className='gapforinputfilter' value={4} name='PS5' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(4) < 0) { setMethod((method) => [...method, 4]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(4), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="X-Box">X-Box:</label>
                                        <input className='gapforinputfilter' value={5} name='X-Box' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(5) < 0) { setMethod((method) => [...method, 5]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(5), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="Pen & Paper">Pen & Paper:</label>
                                        <input className='gapforinputfilter' value={6} name='Pen & Paper' type='checkbox'
                                            onChange={() => {
                                                if (method.indexOf(6) < 0) { setMethod((method) => [...method, 6]) }
                                                else { setMethod(prevMethod => [...prevMethod.toSpliced(method.indexOf(6), 1)]) }
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className='categoryanddownarrowfiltersearch'
                            onMouseEnter={() => setMinPlayer(true)}
                            onMouseLeave={() => setMinPlayer(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Minimum Players</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => { onSubmit() }}>Search</button>
            <div>
            </div>
        </div>

    )
}


export default FilteredGames
