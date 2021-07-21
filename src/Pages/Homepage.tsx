import { useState, useEffect } from 'react';
import MealCarousel from '../Components/Carousel'
import HomePageSearch from '../Components/HomePageSearch'
import Axios, { AxiosResponse } from 'axios';
import Meal from '../Components/Meal';


export default function Homepage() {

    const [carouselToggle, setCarouselToggle] = useState<any>(true)
    const [posts, setPosts] = useState<any>("");

    const [meals, setMeals] = useState<any>("")
    const [cities, setCities] = useState<any>("")
    const [data, setData] = useState<any>("")

    const filterMeals = (useEffectData) => {
        let unfilteredMeals = useEffectData.map((item: any) => item.meal)
        return ([...new Set(unfilteredMeals)])
    }

    const filterCities = (useEffectData) => {
        let unfilteredCities = useEffectData.map((item: any) => item.city)
        return ([...new Set(unfilteredCities)])
    }

    useEffect(() => {

        async function getMeals() {
            await Axios.get("http://localhost:4000/getmeals", {
                withCredentials: true
            }).then((res: AxiosResponse) => {
                setData(res.data)
                setMeals(filterMeals(res.data))
                setCities(filterCities(res.data))
            })
        }

        getMeals()
    }, []);

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

    if (!data || !meals || !cities) {
        return null;
    }

    return (
        <>
            <div className="HomePageSearch">
                <h2>Search by Meal</h2>
                <HomePageSearch 
                meals={meals}
                cities={cities}
                data={data}
                filterMeals={filterMeals}
                filerCities={filterCities}
                postMeals={postMeals} />
            </div>
            <div>
                {display}
            </div>
        </>
    )
}

