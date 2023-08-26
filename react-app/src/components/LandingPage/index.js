import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkSearchGameName, thunkFilteredGames } from '../../store/games'
import logo from '../../Images/GAMENIGHTv2.png'
import './landingpage.css'
import { FilterCon } from '../../context/FilterContex'
import Cart from '../Cart'
import Confused from '../Confused'


function LandingPage() {
    const currUser = useSelector(state => state.session.user?.id)
    const history = useHistory()
    const dispatch = useDispatch()
    const {category, setCategory,method, setMethod,maxPlayerValue, setMaxPlayerValue,minPlayerValue, setMinPlayerValue,minAgeValue, setMinAgeValue,maxPriceValue, setMaxPriceValue, cartShown, setCartShown} = useContext(FilterCon)
    // const [category, setCategory] = useState([])
    // const [method, setMethod] = useState([])
    // const [maxPlayerValue, setMaxPlayerValue] = useState(null)
    // const [minPlayerValue, setMinPlayerValue] = useState(null)
    // const [minAgeValue, setMinAgeValue] = useState(null)
    // const [maxPriceValue, setMaxPriceValue] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const [isShownMethod, setIsShownMethod] = useState(false)
    const [minPlayer, setMinPlayer] = useState(false)
    const [maxPlayer, setMaxPlayer] = useState(false)
    const [minAge, setMinAge] = useState(false)
    const [maxPrice, setMaxPrice] = useState(false)
    const [confusedShown, setConfusedShown] = useState(false)
    const [searchByName, setSearchByName] = useState('')

    const onSubmit = async () => {
        let err = await dispatch(thunkFilteredGames(category, method, minPlayerValue, maxPlayerValue, minAgeValue, maxPriceValue))
        history.push('/games/filtered')
    }

    const onSearchByName = async () => {
        await dispatch(thunkSearchGameName(searchByName))
        history.push('/games/filtered')
    }

    return (
        <div id='neededanothermaindivforpositioningoffooter'>
        <div id='maindivlandingpageall'>
           <div id='positionforlandingpage'>
            <div>
                <div id='innerdivlogogamenightcenterpagelandingpage'>
                    <img id='logoforgamenightlandingpage' src={logo} onClick={() => history.push('/')} />
                </div>
                <div id='outterdivsearchbarforgames'>
                    <div id='innerdivsearchbarforgameslandingpage'>
                        <input id='searchbarforgameslandingpage' type="text" value={searchByName} placeholder='Search by game name'
                        onChange={(e) => {
                            setSearchByName(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSearchByName()
                            }
                        }}
                        />
                        <div id='innerdivmagnifyingglasssearchbar'
                        onClick={() => {
                            onSearchByName()
                        }}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div id='divforfiltersearchbarlandingpage'>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className={isShown ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Category</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                            >
                                <div id='justforsmoothtransitioninfiltercategory'
                                    onMouseEnter={() => setIsShown(true)}
                                    onMouseLeave={() => setIsShown(true)}
                                ></div>
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
                                        <label htmlFor="Strategy">Strategy/Puzzles:</label>
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
                        <div className={isShownMethod ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
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
                        <div className={minPlayer ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
                            onMouseEnter={() => setMinPlayer(true)}
                            onMouseLeave={() => setMinPlayer(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Min Players</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setMinPlayer(true)}
                                onMouseLeave={() => setMinPlayer(false)}
                            >
                                <div className={minPlayer ? 'innerdivholdingfilterplayers' : 'innerdivholdingfilterplayers hiddenforfilterlandgingpage'}>

                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayers">1</label>
                                        <input className='gapforinputfilter' value={1} name='minplayers' type='radio'
                                            onClick={(e) => {
                                                setMinPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayers">2</label>
                                        <input className='gapforinputfilter' value={2} name='minplayers' type='radio'
                                            onClick={(e) => {
                                                setMinPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayers">3</label>
                                        <input className='gapforinputfilter' value={3} name='minplayers' type='radio'
                                            onClick={(e) => {
                                                setMinPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayers">4</label>
                                        <input className='gapforinputfilter' value={4} name='minplayers' type='radio'
                                            onClick={(e) => {
                                                setMinPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayers">5+</label>
                                        <input className='gapforinputfilter' value={5} name='minplayers' type='radio'
                                            onClick={(e) => {
                                                setMinPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className={maxPlayer ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
                            onMouseEnter={() => setMaxPlayer(true)}
                            onMouseLeave={() => setMaxPlayer(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Max Players</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setMaxPlayer(true)}
                                onMouseLeave={() => setMaxPlayer(false)}
                            >
                                <div className={maxPlayer ? 'innerdivholdingfilterplayers' : 'innerdivholdingfilterplayers hiddenforfilterlandgingpage'}>

                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">1</label>
                                        <input className='gapforinputfilter' value={1} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMaxPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">2</label>
                                        <input className='gapforinputfilter' value={2} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMaxPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">3</label>
                                        <input className='gapforinputfilter' value={3} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMaxPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">4</label>
                                        <input className='gapforinputfilter' value={4} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMaxPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">5+</label>
                                        <input className='gapforinputfilter' value={5} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMaxPlayerValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className={minAge ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
                            onMouseEnter={() => setMinAge(true)}
                            onMouseLeave={() => setMinAge(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Min Age</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setMinAge(true)}
                                onMouseLeave={() => setMinAge(false)}
                            >
                                <div className={minAge ? 'innerdivholdingfilterplayers' : 'innerdivholdingfilterplayers hiddenforfilterlandgingpage'}>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayer">3+</label>
                                        <input className='gapforinputfilter' value={3} name='minplayer' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayer">7+</label>
                                        <input className='gapforinputfilter' value={7} name='minplayer' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayer">12+</label>
                                        <input className='gapforinputfilter' value={12} name='minplayer' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxplayers">16+</label>
                                        <input className='gapforinputfilter' value={16} name='maxplayers' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayer">18+</label>
                                        <input className='gapforinputfilter' value={18} name='minplayer' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="minplayer">All ages</label>
                                        <input className='gapforinputfilter' value={100} name='minplayer' type='radio'
                                            onClick={(e) => {
                                                setMinAgeValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='outterdivcategorydownarrowfiltersearch'>
                        <div className={maxPrice ? 'categoryanddownarrowfiltersearchhover' :'categoryanddownarrowfiltersearch'}
                            onMouseEnter={() => setMaxPrice(true)}
                            onMouseLeave={() => setMaxPrice(false)}
                        >
                            <p className='ptagcategoryfiltersearch'>Max Price</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                        <div>
                            <div className='maindivholdingfilter'
                                onMouseEnter={() => setMaxPrice(true)}
                                onMouseLeave={() => setMaxPrice(false)}
                            >
                                <div className={maxPrice ? 'innerdivholdingfilterplayers' : 'innerdivholdingfilterplayers hiddenforfilterlandgingpage'}>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">$10</label>
                                        <input className='gapforinputfilter' value={10} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">$20</label>
                                        <input className='gapforinputfilter' value={20} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">$30</label>
                                        <input className='gapforinputfilter' value={30} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">$40</label>
                                        <input className='gapforinputfilter' value={40} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                    <div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">$50</label>
                                        <input className='gapforinputfilter' value={50} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div><div className='innerdivplayersradio'>
                                        <label htmlFor="maxprice">All prices</label>
                                        <input className='gapforinputfilter' value={10000} name='maxprice' type='radio'
                                            onClick={(e) => {
                                                setMaxPriceValue(e.target.value)
                                            }}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id='innerdivbuttonsearchfilter'>
                            <button id='styleforbuttonfiltersearch' onClick={() => { onSubmit() }}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
        <div id={cartShown ? 'outerdivcartsinglepagetrue' : 'outerdivcartsinglepagefalse'} >
                {currUser === undefined ? null : <Cart />}
            </div>
            <div id='outerconfusedonhowtosearch'>
                <div
                id='divhowtousegamenight'
                onClick={() => {
                    setConfusedShown(true)
                }}
                >
                    How to use Game Night
                </div>
                {confusedShown && <Confused setConfusedShown={setConfusedShown} />}
            </div>
            {cartShown && <div id='divtomakecartdisappear'
                onClick={() => {
                    setCartShown(false)
                }}
                >

                </div>}
        </div>
        <div id='maindivfooterlandingpage'>
            <div id='outerdivfooterlinks'>
                <div className='innerdivslinksaboutfooter'>
                    Created by Matthew Boyer
                </div>
                <div className='innerdivslinksaboutfooter'>
                    <img id='linkedinicon' src="https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-a7sf08js.png" alt="linkedinicon" />
                    <a className='linksinaboutfooter' href='https://www.linkedin.com/in/matthew-boyer-90884924/' target='_blank'>LinkedIn</a>
                </div>
                <div className='innerdivslinksaboutfooter'>
                    <img id='githubicon' src="https://static-00.iconduck.com/assets.00/github-icon-512x497-oppthre2.png" alt="linkedinicon" />
                    <a className='linksinaboutfooter' href='https://github.com/Matt-Boyer' target='_blank'>GitHub</a>
                </div>
            </div>
        </div>
        </div>
    )
}


export default LandingPage
