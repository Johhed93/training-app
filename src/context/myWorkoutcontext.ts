import { createContext, SetStateAction } from "react";
import { WorkoutType } from "../types/WorkoutType";
interface myWorkout{
    setMyWorkouts:React.Dispatch<SetStateAction<WorkoutType[]>>
    myWorkouts:WorkoutType[]
}
const MyWorkoutContext=createContext<myWorkout>({} as myWorkout)
export default MyWorkoutContext