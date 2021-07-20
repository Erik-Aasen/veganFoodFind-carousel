import Axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import Meal from '../Components/Meal';
// import { UserInterface } from '../Interfaces/Interfaces'
import React, { useContext } from 'react';
import { myContext } from './Context';

export default function MyMeals() {
    const ctx = useContext(myContext);

    const [posts, setPosts] = useState<any>();

    useEffect(() => {

        Axios.get("http://localhost:4000/mymeals", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            setPosts(res.data);
        })
    }, []);

    if (!posts) {
        return null
    }

    return (
        <>
        <div>
           <h1>{ctx.username}'s meals</h1> 
        </div>
        <div>
            {posts.map((post: any) => {
                let city, description, meal, restaurant, _id, picture;
                ({city, description, meal, restaurant, _id, picture} = post);

                return (
                    <Meal
                        key={_id}
                        _id={_id}
                        city={city}
                        description={description}
                        meal={meal}
                        restaurant={restaurant} 
                        picture={picture}
                        myMeal={true}
                    />
                )
            })}
        </div>
        </>
    )
}

