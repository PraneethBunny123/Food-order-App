import MealItem from "./MealItem"
import useHttp from "./hooks/useHttp"

export default function Meals() {
    const {data: loaderMeals, isLoading, error} = useHttp('http://localhost:3000/meals', {}, [])

    if(isLoading) {
        return <P>Loading ...</P>
    }


    return (
        <ul id="meals">
            {loaderMeals.map(meal => (
                <MealItem key={meal.name} meal={meal}/>
            ))}
        </ul>
    )
}