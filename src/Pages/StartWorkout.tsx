import { useContext, useEffect, useState } from "react";
import MyWorkoutContext from "../context/myWorkoutcontext";
import { useNavigate, useParams } from "react-router-dom";
import { WorkoutType } from "../types/WorkoutType";
import "../components/components.css";
import "../App.css";
import top2 from "../utils/countApperance";
import { Excercise } from "../types/Excercise";
import countTime from "../utils/countTime";
type RouteParams = {
  id: string | undefined;
};
const StartWorkout = () => {
  const [workoutIsOn, SetWorkoutIsOn] = useState<boolean>(false);
  const [workout, SetWorkout] = useState<WorkoutType>({} as WorkoutType);
  const [workoutTimer, SetWorkoutTimer] = useState<number>(0);
  const [currentWorkout, SetCurrentWorkout] = useState<Excercise[]>([]);
  const [countSet, SetCountSet] = useState<number>(0);

  const myWorkouts = useContext(MyWorkoutContext);

  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (myWorkouts.myWorkouts.length === 0) {
      navigate("/");
      return;
    }
    const findWorkout: WorkoutType | undefined = myWorkouts.myWorkouts.find(
      (w) => w.id === Number(id)
    );
    if (findWorkout) {
      SetWorkout(findWorkout);
      SetWorkoutIsOn(true);
      SetWorkoutTimer(findWorkout.vila * 60);
      SetCurrentWorkout(findWorkout.excersise);
      SetCountSet(findWorkout.sets);
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (!workoutIsOn) {
      return;
    }
    if (currentWorkout.length === 0) {
      SetWorkoutIsOn(false);
    }
    if (workoutTimer === 0) {
      SetWorkoutTimer(workout.vila * 60);
      SetCountSet((prevState) => prevState - 1);
      return;
    }
    if (countSet === 0 && currentWorkout.length > 0) {
      SetCountSet(workout.sets);
      const nextExcercise = currentWorkout.slice(1);
      console.log(currentWorkout);
      SetCurrentWorkout(nextExcercise);
    }
    const timer = setInterval(() => {
      SetWorkoutTimer((prevState) => prevState - 1);
    }, 1);
    return () => clearInterval(timer);
  }, [workoutTimer]);

  return (
    <div className="workout-container m-6">
      <div className="flex flex-col gap-4 rounded-md bg-zinc-900 p-8 items-center">
        {workoutIsOn ? (
          <>
            <h2 className="text-indigo-500 text-2xl">{top2(workout.excersise)}</h2>
            <div className="flex items-center justify-center rounded-full border-indigo-300 border-solid border-4 h-36 w-36">
              <p className="text-xl text-white">{workoutTimer}</p>
            </div>
            <p className="py-1  px-3 bg-neutral-700 text-indigo-300 rounded-md">
              {countSet} sets kvar
            </p>
            <ul className="current-workout">
              {currentWorkout.map((w, index) => (
                <li
                  key={index}
                  className={
                    index === 0 ? "selected-workout-list active-workout" : "selected-workout-list"
                  }
                >
                  {index === 0 || index === 1 ? (
                    <>
                      <p className="text-lg">{w.övning}</p>{" "}
                      <>
                        <p className="text-base">Beskrivning:</p>{" "}
                        <p className="text-wrap text-sm">{w.beskrivning} </p>
                      </>{" "}
                    </>
                  ) : (
                    w.övning
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : workout.excersise ? (
          <div className="w-80 h-80 flex items-center justify-center flex-col rounded-full border-indigo-300 border-solid border-4 gap-1">
            <h2 className="text-2xl text-indigo-500">
              Ditt {top2(workout.excersise)}pass är klart
            </h2>
            <p className="text-indigo-300">Ökten tog {countTime(workout)}</p>
            <button className="rounded-md px-4 py-2 bg-pink-500 text-white mt-2 transition ease-in-out duration-700 hover:bg-indigo-500">
              Gå tillbaka
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default StartWorkout;
