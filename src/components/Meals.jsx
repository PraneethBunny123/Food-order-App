import MealItem from "./MealItem"
import useHttp from "./hooks/useHttp"

const requestConfig = {}

export default function Meals() {
    const {data: loaderMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    if(isLoading) {
        return <p>Loading ...</p>
    }


    return (
        <ul id="meals">
            {loaderMeals.map(meal => (
                <MealItem key={meal.name} meal={meal}/>
            ))}
        </ul>
    )
}