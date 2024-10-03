import { Excercise } from "../types/Excercise";
import "./components.css"
interface DescriptionCardProps {
    excercise:Excercise[];
  }
const Descriptioncard:React.FC<DescriptionCardProps>= ({excercise})=>{
return(
<>
{
    excercise.map((excercises,index)=>(
<div key={index} className="card-description">
    <h3>{excercises.övning}</h3>
    <p>{excercises.kroppsdel}</p>
    <p>Beskrivning:{excercises.beskrivning}</p>
    <p>{excercises.nivå}</p>
</div>
    ))
}

</>
)
}
export default Descriptioncard