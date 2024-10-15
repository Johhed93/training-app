import { WorkoutType } from "../types/WorkoutType"
import top2 from "../utils/countApperance"

interface FinishedWoProps{
    workout:WorkoutType
}
const FinishedWorkout: React.FC<FinishedWoProps>=({workout})=>{
    
    return(
        <li >
        <button className="text-white w-48 bg-pink-500 py-2 rounded-md">{top2(workout.excersise)}</button>
        </li>
    )
}
export default FinishedWorkout