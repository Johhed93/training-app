import { useContext } from "react";
import "../App.css";
import MyWorkoutList from "../components/MyWorkoutList";
import StartedWorkoutContext from "../context/StartedWorkoutContext";
import FinishedWorkout from "../components/FinishedWorkout";
import MyWorkoutContext from "../context/myWorkoutcontext";

const MyWorkoutPage = () => {
  const mySavedWorkoutContext = useContext(StartedWorkoutContext);
  const myWorkoutsContext = useContext(MyWorkoutContext);
  return (
    <div className="root-wrapper">
      <div className="sidebar bg-zinc-900">
        <h3 className="text-indigo-300 text-2xl mt-2">Mina tidigare ökter</h3>
        {mySavedWorkoutContext.startedWorkout.length === 0 ? (
          <>
            <p className="py-2 px-5 bg-zinc-600 rounded-md">Du har inga tidigare ökter</p>
          </>
        ) : (
          <ul className="flex flex-col gap-2">
            {mySavedWorkoutContext.startedWorkout.map((workout) => (
              <FinishedWorkout key={workout.id} workout={workout} />
            ))}
          </ul>
        )}
      </div>
      <div className="central-content bg-zinc-900">
        <h1 className="text-indigo-300 text-3xl mt-2">Mina Treningspass</h1>
        <div className="myWorkouts-container">
          {myWorkoutsContext.myWorkouts.length === 0 ? (
            <div className="py-5 px-6 bg-zinc-600 rounded-md text-white flex flex-col gap-4">
              <p className="text-lg">Du har inte sparat några ökter än</p> <button className="bg-pink-600 py-2">Hitta ökter</button>
            </div>
          ) : (
            <MyWorkoutList />
          )}
        </div>
      </div>
    </div>
  );
};
export default MyWorkoutPage;
