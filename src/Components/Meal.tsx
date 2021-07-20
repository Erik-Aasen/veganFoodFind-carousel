
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

export default function Meal(props) {
    const { _id, meal, restaurant, city, picture, description, myMeal } = props;

    const editmeal = {
        pathname: "/editmeal",
        _id: _id,
        meal: meal,
        restaurant: restaurant,
        city: city,
        picture: picture,
        description: description
    }

    const deleteMeal = () => {

        axios.post('http://localhost:4000/deletemeal', {
            _id
        }, { withCredentials: true }
        ).then((res: AxiosResponse) => {
            if (res.data === "meal deleted") {
                // history.push('/mymeals')
                window.location.reload();
            }
        })
        
    }

    let editDelete
    if (myMeal) {
        editDelete = (
            <>
                <Link to={editmeal}>Edit</Link>
                <Link to="/mymeals" onClick={deleteMeal}>Delete</Link>
            </>
        )
    }

    return (
        <div>
            {editDelete}
            <h1>{meal}</h1>
            <p>{restaurant}</p>
            <p>{city}</p>
            <img className='photo' alt='' src={picture} />
            <p>{description}</p>
        </div>
    )
}
