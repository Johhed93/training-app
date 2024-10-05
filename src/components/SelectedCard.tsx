import { SetStateAction } from "react"
import { Excercise } from "../types/Excercise"

interface selectedCardProps{
    workout:Excercise,
    setSelectedWorkout:React.Dispatch<SetStateAction<Excercise[]>>,
    selectedWorkout:Excercise[]
}
const SelectedCard:React.FC<selectedCardProps>=({workout, setSelectedWorkout, selectedWorkout})=>{
    const handleRemoveObject=()=>{
    const updatedList = selectedWorkout.filter((w) => w.övning !== workout.övning)
    setSelectedWorkout(updatedList)
    }
    return(
       <li className="selected-workout-list" onClick={()=> handleRemoveObject()}>
        {workout.övning}
       </li>
)
}
export default SelectedCard