import MealItem from "./MealItem"
import useHttp from "./hooks/useHttp"

export default function Meals() {
    const {data: loaderMeals, isLoading, error} = useHttp('http://localhost:3000/meals')

    return (
        <ul id="meals">
            {loaderMeals.map(meal => (
                <MealItem key={meal.name} meal={meal}/>
            ))}
        </ul>
    )
}