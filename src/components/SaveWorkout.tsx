import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Excercise } from "../types/Excercise";
import { toast, ToastContainer } from "react-toastify";
import "./components.css";
import "../App.css";
import MyWorkoutContext from "../context/myWorkoutcontext";
import { WorkoutType } from "../types/WorkoutType";
interface SaveWorkoutProps {
  selectedWorkout: Excercise[];
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
interface UserOptions {
  level: string;
  reps: string;
  sets: string;
  vila: number;
  procent: string;
}
const SaveWorkout: React.FC<SaveWorkoutProps> = ({
  selectedWorkout,
  modalIsOpen,
  setModalIsOpen,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [level, Setlevel] = useState<UserOptions>();
  const [error, setError] = useState<boolean>(false);
  const [id, setId]= useState<number>(1)
  const myWorkoutContext=useContext(MyWorkoutContext)
  const userOption: UserOptions[] = [
    {
      level: "Tung styrke",
      reps: "1 - 4",
      sets: "3 - 4",
      vila: 2,
      procent: "90 - 100",
    },
    {
      level: "Styrke",
      reps: "5 - 8",
      sets: "3 - 4",
      vila: 1.5,
      procent: "80 - 90",
    },
    {
      level: "Volym",
      reps: "8 - 12",
      sets: "3 - 4",
      vila: 1,
      procent: "70 - 80",
    },
  ];
  useEffect(() => {
    if (!modalIsOpen) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
    }
    if (selectedWorkout.length < 0) {
      setModalIsOpen(false);
      
    }
  }, [modalIsOpen]);
  const handleLevelClick = (levl: UserOptions) => {
    Setlevel(levl);
  };
  const handleSave = () => {
    if (!level) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
  const updatedlist:Excercise[]=selectedWorkout.map((workout)=>(
    {...workout,
    ...level
    }
  ))
  const listWithId:WorkoutType={
    id:id,
    excersise:updatedlist
  }
  
  myWorkoutContext.setMyWorkouts((prevState:WorkoutType[])=> [...prevState, listWithId ])
  setId((prevState)=>prevState+1)
  console.log(myWorkoutContext.myWorkouts)
  toast.success("Økten sparad")
  };
  return (
    <>
     <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      {modalIsOpen && (
       
        <dialog ref={dialogRef} className="dialog-element">
          <h2 className="text-indigo-500 text-2xl">Hej</h2>
          <ul className="sidebar-list">
            {selectedWorkout.map((workout, index) => (
              <li key={index} className="selected-desc-list">
                <p className="text-xl">{workout.övning}</p>
                <p className="desc-text-modal">{workout.beskrivning}</p>{" "}
              </li>
            ))}
          </ul>
          <h3 className="text-indigo-500 text-lg ">Vad vill du uppnå</h3>
          <div className="flex gap-2 grow w-full">
            {userOption.map((user, index) => (
              <button
                className={`level-btn ${
                  user.level === level?.level ? <></> : "selected"
                }`}
                key={index}
                onClick={() => handleLevelClick(user)}
              >
                {user.level}
              </button>
            ))}
          </div>
          {error && (
            <p className="text-red-400">Du måste velja vad du vill uppnå</p>
          )}
          <div className="flex gap-6 grow w-full mt-5">
            <button className="close-btn" onClick={() => setModalIsOpen(false)}>
              Steng
            </button>
            <button className="save-btn" onClick={handleSave}>
              Spara økt
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};
export default SaveWorkout;
