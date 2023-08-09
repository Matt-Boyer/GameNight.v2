import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './landingpage.css'


function LandingPage() {
    const history = useHistory()

    return (
        <div>
            <button onClick={()=>{
                history.push('/games/filtered')
            }}>Filtered Games</button>
            <button onClick={()=>{
                history.push('/game/1')
            }}>SingleGame</button>
            <button onClick={()=>{
                history.push('/reviewform/1')
            }}>ReviewForm</button>
        </div>
    )
}


export default LandingPage
