import Axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

export default function HomePageSearch(props) {

    const [city, setCity] = useState("All cities")
    const [meal, setMeal] = useState("All meals")

    const [meals, setMeals] = useState<any>(props.meals)
    const [cities, setCities] = useState<any>(props.cities)
    const [data, setData] = useState<any>(props.data)

    if (!data || !meals || !cities) {
        return null;
    }

    const selectCity = (e: any) => {
        setCity(e.target.value);
        let cityForFiltering = e.target.value;
        // console.log(city); // returns null
        // console.log(cityForFiltering); // returns value

        if (cityForFiltering === "All cities") {
            setMeals(props.filterMeals(data))
        } else {
            let updatedMeals = data.filter(item => {
                return (item.city === cityForFiltering)
            })
            setMeals(props.filterMeals(updatedMeals))
        }
    }

    return (
        <div>
            <form>
                <select onChange={selectCity}>
                    <option>All cities</option>
                    {
                        cities.map((item: any) => {
                            return (
                                <option key={item} id={item}>{item}</option>
                            )
                        })
                    }
                </select>
                <br />
                <select onChange={e => setMeal(e.target.value)}>
                    <option>All meals</option>
                    {
                        meals.map((item: any) => {
                            return (
                                <option key={item} id={item}>{item}</option>
                            )
                        })
                    }
                </select>
                <br />
                <button onClick={e => props.postMeals(e, city, meal)} type="submit">Search</button>
            </form>
        </div>
    )
}
