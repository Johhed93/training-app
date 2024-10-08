import { useContext } from "react";
import MyWorkoutContext from "../context/myWorkoutcontext";
import { Excercise } from "../types/Excercise";
import { WorkoutType } from "../types/WorkoutType";
import "./components.css"


const MyWorkoutList = () => {
    const MyWorkouts=useContext(MyWorkoutContext)
    console.log(MyWorkouts.myWorkouts)
  return (
  <>
  {MyWorkouts.myWorkouts.map((workout)=>(
    <div className="my-workout" key={workout.id}>
     <p>{workout.id}</p>
     {workout.excersise.map((w)=>(
        <p>{w.övning}</p>
     ))}
    </div>
  ))}
  </>
  )
};
export default MyWorkoutList;
