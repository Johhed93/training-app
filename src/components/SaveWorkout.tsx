import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Excercise } from "../types/Excercise";
import { toast} from "react-toastify";
import "./components.css";
import "../App.css";
import MyWorkoutContext from "../context/myWorkoutcontext";
import { WorkoutType } from "../types/WorkoutType";
import SelectedCard from "./SelectedCard";
import IdContext from "../context/IdContext";
interface SaveWorkoutProps {
  selectedWorkout: Excercise[];
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedWorkout: React.Dispatch<SetStateAction<Excercise[]>>
}
interface UserOptions {
  level: string;
  reps: string;
  sets: number;
  vila: number;
  procent: string;
}
const SaveWorkout: React.FC<SaveWorkoutProps> = ({
  selectedWorkout,
  modalIsOpen,
  setModalIsOpen,
  setSelectedWorkout,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [level, Setlevel] = useState<UserOptions>();
  const [error, setError] = useState<boolean>(false);
  const idContext=useContext(IdContext)
  const myWorkoutContext=useContext(MyWorkoutContext)
  const userOption: UserOptions[] = [
    {
      level: "Tungt",
      reps: "1 - 4",
      sets: 4,
      vila: 2,
      procent: "90 - 100",
    },
    {
      level: "Styrke",
      reps: "5 - 8",
      sets: 4,
      vila: 1.5,
      procent: "80 - 90",
    },
    {
      level: "Volym",
      reps: "8 - 12",
      sets: 4,
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
  }, [modalIsOpen]);
  useEffect(()=>{
  if(selectedWorkout.length===0){
    setModalIsOpen(false)
  }
  },[selectedWorkout])
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
    }
  ))
  const listWithId:WorkoutType={
    id:idContext.id,
    ...level,
    excersise:updatedlist
  }
  console.log(listWithId)
  myWorkoutContext.setMyWorkouts((prevState:WorkoutType[])=> [...prevState, listWithId ])
  idContext.SetId((prevState)=> prevState+1)
  setModalIsOpen(false);
  toast.success("💪 Økten sparad")
  setSelectedWorkout([])
  };
  return (
    <>
 
      {modalIsOpen && (
       
        <dialog ref={dialogRef} className="dialog-element">
          <ul className="sidebar-list">
            {selectedWorkout.map((workout, index) => (
              <SelectedCard key={index} workout={workout} setSelectedWorkout={setSelectedWorkout} selectedWorkout={selectedWorkout}/>
            ))}
          </ul>
          <h3 className="text-indigo-500 text-lg ">Vad vill du uppnå</h3>
          <div className="flex gap-2 grow w-full p-2.5">
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
          <div className="flex gap-6 grow w-full mt-5 p-2.5">
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
