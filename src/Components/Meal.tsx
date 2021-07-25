
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
        <div className="">
            <div className="card text-center">
                <div className="card-body">
                    {editDelete}
                    <img className='card-img-top' alt='' src={picture} />
                    <h4 className='card-title'>{meal}</h4>
                    <p className='card-text'>{restaurant}</p>
                    <p className='card-text'>{city}</p>
                    <p className='card-text'>{description}</p>
                </div>
            </div>
        </div>

    )
}
