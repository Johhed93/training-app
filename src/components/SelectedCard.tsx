import { SetStateAction } from "react"
import { Excercise } from "../types/Excercise"

interface selectedCardProps{
    workout:Excercise,
    setSelectedWorkout:React.Dispatch<SetStateAction<Excercise[]>>,
}
const SelectedCard:React.FC<selectedCardProps>=({workout, setSelectedWorkout})=>{
    return(
       <li className="selected-workout-list">
        {workout.övning}
       </li>
)
}
export default SelectedCard