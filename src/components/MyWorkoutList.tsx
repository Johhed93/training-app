import { useContext } from "react";
import MyWorkoutContext from "../context/myWorkoutcontext";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { WorkoutType } from "../types/WorkoutType";
import top2 from "../utils/countApperance";

const MyWorkoutList = () => {
  const MyWorkouts = useContext(MyWorkoutContext);
  const navigate=useNavigate();



  const handleStartButton=(workout:WorkoutType)=>{
    navigate(`/startworkout/${workout.id}`)
  }

  return (
    <>
      {MyWorkouts.myWorkouts.map((workout) => (
        <div className="my-workout" key={workout.id}>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-indigo-200 text-2xl mb-2">
              {top2(workout.excersise)}
            </h2>
            <div className="flex gap-2 items-center text-lg p-2.5 flex-wrap justify-between">
              <p className="py-1  px-3 bg-neutral-900 text-indigo-300 rounded-md">
                {workout.level}
              </p>
              <p className="py-1  px-3 bg-neutral-900 text-indigo-300 rounded-md">
                {workout.procent}% av max
              </p>
              <p className="py-1  px-3 bg-neutral-900 text-indigo-300 rounded-md">
                {workout.reps} repitioner
              </p>
              <p className="py-1  px-3 bg-neutral-900 text-indigo-300 rounded-md">
                {workout.vila}min vila
              </p>
            </div>
          </div>
          <ul className="sidebar-list">
            {workout.excersise.map((w, index) => (
              <li key={index} className="selected-workout-list">
                {w.övning}
              </li>
            ))}
          </ul>
          <div className="p-2.5">
            <button onClick={()=>handleStartButton(workout)} className="save-btn mt-2">Starta ökt</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default MyWorkoutList;
