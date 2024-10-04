import { SetStateAction } from "react";
import { Excercise } from "../types/Excercise";
import "./components.css"
interface DescriptionCardProps {
    excercise:Excercise[];
    setSelectedWorkout:React.Dispatch<SetStateAction<Excercise[]>>
  }
const Descriptioncard:React.FC<DescriptionCardProps>= ({excercise, setSelectedWorkout})=>{
const handleButtonClick=(excer:Excercise)=>{
setSelectedWorkout((prevState)=>[...prevState, excer])
}
return(
<>
{
    excercise.map((excercises,index)=>(
<div key={index} className="card-description">
    <h3>{excercises.övning}</h3>
    <p>{excercises.kroppsdel}</p>
    <p>Beskrivning:{excercises.beskrivning}</p>
    <p>{excercises.nivå}</p>
    <button className="add-to-myworkout" onClick={()=>handleButtonClick(excercises)}>Legg till</button>
</div>
    ))
}

</>
)
}
export default Descriptioncard