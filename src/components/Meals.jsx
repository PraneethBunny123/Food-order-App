import { useEffect, useState } from "react"
import MealItem from "./MealItem"

export default function Meals() {
    const [loaderMeals, setLoaderMeals] = useState([])

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals')

            if(!response.ok) {
                ///
            }

            const meals = await response.json()
            setLoaderMeals(meals)
        }

        fetchMeals()
    }, [])
    


    return (
        <ul id="meals">
            {loaderMeals.map(meal => (
                <MealItem key={meal.name} meal={meal}/>
            ))}
        </ul>
    )
}