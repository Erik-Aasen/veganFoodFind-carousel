import { useState } from 'react';
import MealCarousel from '../Components/Carousel'
import HomePageSearch from '../Components/HomePageSearch'
import Axios, { AxiosResponse } from 'axios';
import Meal from '../Components/Meal';


export default function Homepage() {

    const [carouselToggle, setCarouselToggle] = useState<any>(true)
    const [posts, setPosts] = useState<any>("");

    const postMeals = (e, city, meal) => {
        Axios.post('http://localhost:4000/getmeals', {
            city, meal
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            setCarouselToggle(false)
            setPosts(res.data)
        })
        e.preventDefault();
    }

    let display;

    if (carouselToggle) {
        display = (
            <>
                <MealCarousel />
            </>
        )
    } else {
        if (!posts) {
            return null
        }

        display = (
            <>
                {posts.map((post: any) => {
                    let city, description, meal, restaurant, _id, picture;
                    ({ city, description, meal, restaurant, _id, picture } = post);

                    return (
                        <Meal
                            key={_id}
                            city={city}
                            description={description}
                            meal={meal}
                            restaurant={restaurant}
                            picture={picture}
                        />
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className="HomePageSearch">
                <h2>Search by Meal</h2>
                <HomePageSearch postMeals={postMeals} />
            </div>
            <div>
                {display}
            </div>
        </>
    )
}

