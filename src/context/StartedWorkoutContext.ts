import { createContext, SetStateAction } from "react";
import { WorkoutType } from "../types/WorkoutType";
interface StartedWorkoutProps {
    startedWorkout: WorkoutType[];
    setStartedWorkout: React.Dispatch<SetStateAction<WorkoutType[]>>
}
const StartedWorkoutContext = createContext<StartedWorkoutProps>({}as StartedWorkoutProps)
export default StartedWorkoutContext