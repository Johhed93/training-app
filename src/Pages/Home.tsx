import { useContext, useEffect, useState } from "react";
import "../App.css";
import ExcerciseContext from "../context/ExcerciseContext";
import { Excercise } from "../types/Excercise";
import Descriptioncard from "../components/DescriptionCard";
import MyWorkoutContext from "../context/myWorkoutcontext";
import SelectedCard from "../components/SelectedCard";
import SaveWorkout from "../components/SaveWorkout";
interface MuscleTheme {
  kroppsdel: string;
}
const Home = () => {
  const myWorkoutContext = useContext(MyWorkoutContext);
  const excercersiseContext = useContext(ExcerciseContext);
  const [selectedWorkout, setSelectedWorkout] = useState<Excercise[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [muscleGroups, setMusclegroups] = useState<Excercise[]>([]);
  const [themes, setThemes] = useState<MuscleTheme[]>([]);
  const [modalIsOpen,setModalIsOpen]=useState<boolean>(false)

  useEffect(() => {
    setMusclegroups(excercersiseContext.excercises);
    const getAllThemes = new Set(
      excercersiseContext.excercises.map((excercise) => excercise.kroppsdel)
    );
    const themeArray = Array.from(getAllThemes).map((kroppsdel) => ({
      kroppsdel,
    }));
    setThemes(themeArray);
  }, [excercersiseContext.excercises]);

  const handleButtonClick = (musclegroup: string) => {
    const updatedlist = excercersiseContext.excercises.filter(
      (muscle) => muscle.kroppsdel === musclegroup
    );
    setMusclegroups(updatedlist);
    setSelectedTheme(musclegroup)
  };
  return (
    <div className="root-wrapper">
    <SaveWorkout selectedWorkout={selectedWorkout} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}/>
      <div className="sidebar">
        <h2 className="theme-headline">Themes</h2>
        {themes.map((theme, index) => (
          <button
            className="theme-button"
            key={index}
            onClick={() => handleButtonClick(theme.kroppsdel)}
          >
            {theme.kroppsdel}
          </button>
        ))}
      </div>
      <div className="central-content">
        <h1 className="text-indigo-500 text-2xl mt-2">
          Välkommen till min träningssida
        </h1>
        <h2 className="text-indigo-500 text-lg">
          {selectedTheme === ""
            ? "Alla övningar"
            : `Alla ${selectedTheme} övningar`}
        </h2>
        <div className="excercises-container">
          <Descriptioncard
            excercise={muscleGroups}
            setSelectedWorkout={setSelectedWorkout}
          />
        </div>
      </div>
      <div className="sidebar">
        <ul className="sidebar-list">
          {selectedWorkout.length === 0 ? (
            <li>Inga øvningar lagt till en</li>
          ) : (
            <>
            {selectedWorkout.map((workout, index) => (
              <SelectedCard
                key={index}
                workout={workout}
                setSelectedWorkout={setSelectedWorkout}
              />
            ))}
            <button className="save-btn" onClick={()=>setModalIsOpen(true)}>Spara</button>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};
export default Home;
