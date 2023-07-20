import {FaHamburger} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Surprise = () => {
    

    const navigate = useNavigate()

    const handleClick =  () => {
       fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`)
       .then(response => response.json())
       .then(data =>  navigate('/recipe/' + (data.recipes[0].id).toString()))
    }
    return(
        <div className="surprise-component">
            <button className="surprise-btn" onClick={handleClick}>Surprise Me <FaHamburger className='surprise-noodle'/></button>
        </div>
    )
}

export default Surprise