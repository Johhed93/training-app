import { useContext, useEffect, useState } from "react"
import "../App.css"
import ExcerciseContext from "../context/ExcerciseContext"
import { Excercise } from "../types/Excercise"
import Descriptioncard from "../components/DescriptionCard"
interface MuscleTheme{
    kroppsdel:string
}
const Home=()=>{   
    const excercersiseContext=useContext(ExcerciseContext)
    const [selectedTheme,setSelectedTheme]=useState<string>("")
    const [muscleGroups, setMusclegroups]= useState<Excercise[]>([])
    const [themes, setThemes] = useState<MuscleTheme[]>([])
    
    useEffect(()=>{
    setMusclegroups(excercersiseContext.excercises)
    const getAllThemes = new Set(excercersiseContext.excercises.map(excercise => excercise.kroppsdel))
    const themeArray = Array.from(getAllThemes).map(kroppsdel => ({ kroppsdel }));
    setThemes(themeArray)
    console.log(excercersiseContext.excercises)
    }, [excercersiseContext.excercises])
    return(
    <div className="root-wrapper">
        <div className="sidebar">
         <h2 className="theme-headline">Themes</h2>
         {
            themes.map((theme,index)=>(
            <button className="theme-button" key={index}>{theme.kroppsdel}</button>
            )
            )
         }
        </div>
        <div className="central-content">
            <h1 className="text-indigo-500 text-2xl mt-2">Välkommen till min träningssida</h1>
            <h2 className="text-indigo-500 text-lg">{selectedTheme===""? "Alla övningar" : `Alla ${selectedTheme} övningar`}</h2>
            <div className="excercises-container">
            <Descriptioncard excercise={muscleGroups}/>
            </div>

        </div>
        <div className="sidebar">

        </div>
    </div>
    )
}
export default Home