import { useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
// import ImageUploader from 'react-images-upload';
// import {compress, compressAccurately} from 'image-conversion';
// import * as imageConversion from 'image-conversion';
import piexif from 'piexifjs';

export default function AddMeal() {

    const [restaurant, setRestaurant] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [meal, setMeal] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [picture, setPicture] = useState<any>();

    const [orientation, setOrientation] = useState<any>(8);

    let history = useHistory();

    // THIS WORKS
    // const onDrop = async (e) => {
    //     var reader = new FileReader();
    //     await reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = function () {
    //         setPicture(reader.result)
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }

    const rotateMinus = () => {
        // console.log(orientation);
        if (orientation > 1) {
            setOrientation(orientation - 1)
            var zeroth = {};
            zeroth[piexif.ImageIFD.Orientation] = orientation - 1;
            var exifObj = { "0th": zeroth }
            var exifbytes = piexif.dump(exifObj);
            var newJpeg = piexif.insert(exifbytes, picture)
            setPicture(newJpeg)
        } else if (orientation === 1) {
            setOrientation(8)
            var zeroth = {};
            zeroth[piexif.ImageIFD.Orientation] = 8;
            var exifObj = { "0th": zeroth }
            var exifbytes = piexif.dump(exifObj);
            var newJpeg = piexif.insert(exifbytes, picture)
            setPicture(newJpeg)
        }
    }

    const rotatePlus = () => {
        // console.log(orientation);
        if (orientation < 8) {
            setOrientation(orientation + 1)
            var zeroth = {};
            zeroth[piexif.ImageIFD.Orientation] = orientation + 1;
            var exifObj = { "0th": zeroth }
            var exifbytes = piexif.dump(exifObj);
            var newJpeg = piexif.insert(exifbytes, picture)
            setPicture(newJpeg)
        } else if (orientation === 8) {
            setOrientation(1)
            var zeroth = {};
            zeroth[piexif.ImageIFD.Orientation] = 1;
            var exifObj = { "0th": zeroth }
            var exifbytes = piexif.dump(exifObj);
            var newJpeg = piexif.insert(exifbytes, picture)
            setPicture(newJpeg)
        }
    }

    const onDrop = async (e) => {
        var reader = new FileReader();
        await reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            const jpegData = reader.result;
            var strippedJpeg = piexif.remove(jpegData)
            var zeroth = {};
            zeroth[piexif.ImageIFD.Orientation] = orientation;
            var exifObj = { "0th": zeroth }
            var exifbytes = piexif.dump(exifObj);
            var newJpeg = piexif.insert(exifbytes, strippedJpeg)
            setPicture(newJpeg)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const submitMeal = () => {

        axios.post('http://localhost:4000/addmeal', {
            restaurant, city, meal, description, picture
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            // console.log(res.data);
            if (res.data === "meal added") {
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
                <h3>Enter a Meal</h3>
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
                    <br />
                    <br />
                    <button onClick={rotateMinus}>Orientation -</button>
                    <button onClick={rotatePlus}>Orientation +</button>
                    <br />
                    <br />
                    <img className='photo' alt='' src={picture} />
                    <br />
                    <button className="UploadButton" type="submit" onClick={submitMeal}>Upload Meal</button>
                </div>
            </div>
        </>
    )
}

