import { SetStateAction } from "react";
import { Excercise } from "../types/Excercise";
import "./components.css";
interface DescriptionCardProps {
  excercise: Excercise[];
  setSelectedWorkout: React.Dispatch<SetStateAction<Excercise[]>>;
  selectedWorkout: Excercise[];
}
const Descriptioncard: React.FC<DescriptionCardProps> = ({
  excercise,
  setSelectedWorkout,
  selectedWorkout,
}) => {
  const controllIfExist = (excer: Excercise) => {
    return selectedWorkout.some((e) => e.övning === excer.övning);
  };
  const handleButtonClick = (excer: Excercise) => {
    if(!controllIfExist(excer)){
    setSelectedWorkout((prevState) => [...prevState, excer]);
    return;
    }
    const uppdatedList=selectedWorkout.filter((workout)=> workout.övning!==excer.övning) 
    setSelectedWorkout(uppdatedList)
     };
  return (
    <>
      {excercise.map((excercises, index) => (
        <div key={index} className="card-description">
          <h3 className="text-lg font-semibold h-14 ">{excercises.övning}</h3>
          <p className="font-semibold">{excercises.kroppsdel}</p>
          <p className="h-36">
            {" "}
            <span className="font-semibold">Beskrivning:</span>
            {excercises.beskrivning}
          </p>
          <p>Nivå: {excercises.nivå}</p>
          <button
            className={`add-to-myworkout ${
              controllIfExist(excercises) ? "remove-from-workout" : ""
            }`}
            onClick={() => handleButtonClick(excercises)}
          >{!controllIfExist(excercises)? "Lägg till": "Ta bort"}
          </button>
        </div>
      ))}
    </>
  );
};
export default Descriptioncard;
