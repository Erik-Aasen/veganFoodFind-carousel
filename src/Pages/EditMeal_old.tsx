import { useState } from "react";
import { useHistory } from "react-router"; //should be -router-dom?
import axios, { AxiosResponse } from "axios";

export default function EditMeal(props) {
    // const { meal, restaurant, city, picture, description } = props.location;
    // const [restaurant2, setRestaurant] = useState<string>(restaurant);
    
    const _id = props.location._id;
    const [restaurant, setRestaurant] = useState<string>(props.location.restaurant);
    const [city, setCity] = useState<string>(props.location.city);
    const [meal, setMeal] = useState<string>(props.location.meal);
    const [description, setDescription] = useState<string>(props.location.description);
    const [picture, setPicture] = useState<any>(props.location.picture);

    let history = useHistory();

    // THIS WORKS
    const onDrop = async (e) => {
        var reader = new FileReader();
        await reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setPicture(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const editMeal = () => {

        axios.put('http://localhost:4000/addmeal', {
            _id, restaurant, city, meal, description, picture
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            // console.log(res.data);
            if (res.data === "meal updated") {
                // setRestaurant("");
                // setCity("");
                // setMeal("");
                // setDescription("");

                history.push('/mymeals');
            }
        })
    }

    return (
        <>
            <div className="EnterMeal SearchInput">
                <h3>Edit Meal</h3>
                <input className="SearchInput"
                    type="text"
                    placeholder="Restaurant Name"
                    value={restaurant}
                    onChange={e => setRestaurant(e.target.value)}
                />
                <input className="SearchInput"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <input className="SearchInput"
                    type="text"
                    placeholder="Meal Name"
                    value={meal}
                    onChange={e => setMeal(e.target.value)}
                />
                <br />
                <textarea
                    className="SearchInput"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <br />
                <div className="SearchInput">

                    <label htmlFor="img">Upload Image!</label>
                    <br />
                    <input onChange={onDrop} type="file" name="img" id="img"></input>

                    {/* <ImageUploader
                        withIcon={true}
                        buttonText='Choose image'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        singleImage={true}
                    /> */}

                    <img className='photo' alt='' src={picture} />
                    <br />
                    <button className="UploadButton" type="submit" onClick={editMeal}>Update Meal</button>
                </div>
            </div>
        </>
    )
}
