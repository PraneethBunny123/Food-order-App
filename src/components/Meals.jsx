import MealItem from "./MealItem"
import useHttp from "./hooks/useHttp"
import Error from "./Error"

const requestConfig = {}

export default function Meals() {
    const {data: loaderMeals, isLoading, error} = useHttp('http://localhost:3000/mealss', requestConfig, [])

    if(isLoading) {
        return <p className="center">Loading ...</p>
    }

    if(error) {
        return(
            <Error title='Failed to fetch meals' message={error}/>
        )
    }

    return (
        <ul id="meals">
            {loaderMeals.map(meal => (
                <MealItem key={meal.name} meal={meal}/>
            ))}
        </ul>
    )
}