import Axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

export default function HomePageSearch(props) {

    const [city, setCity] = useState("All cities")
    const [meal, setMeal] = useState("All meals")

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

    if (!data || !meals || !cities) {
        return null;
    }

    const selectCity = (e: any) => {
        setCity(e.target.value);
        let cityForFiltering = e.target.value;
        // console.log(city); // returns null
        // console.log(cityForFiltering); // returns value

        if (cityForFiltering === "All cities") {
            setMeals(filterMeals(data))
            setMeal("All meals")
        } else {
            let updatedMeals = data.filter(item => {
                return (item.city === cityForFiltering)
            })
            setMeals(filterMeals(updatedMeals))
            setMeal("All meals")
            
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
