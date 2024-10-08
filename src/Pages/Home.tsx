import { useContext, useEffect, useState } from "react";
import "../App.css";
import ExcerciseContext from "../context/ExcerciseContext";
import { Excercise } from "../types/Excercise";
import Descriptioncard from "../components/DescriptionCard";
import SelectedCard from "../components/SelectedCard";
import SaveWorkout from "../components/SaveWorkout";
import "react-toastify/dist/ReactToastify.css";
interface MuscleTheme {
  kroppsdel: string;
}
const Home = () => {
  const excercersiseContext = useContext(ExcerciseContext);
  const [selectedWorkout, setSelectedWorkout] = useState<Excercise[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [muscleGroups, setMusclegroups] = useState<Excercise[]>([]);
  const [themes, setThemes] = useState<MuscleTheme[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  

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
    setSelectedTheme(musclegroup);
  };
  
  return (
    <div className="root-wrapper">
      
      <SaveWorkout
        selectedWorkout={selectedWorkout}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        setSelectedWorkout={setSelectedWorkout}
      />
      <div className="sidebar">
        <h2 className="theme-headline">Vad vill du träna?</h2>
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
        <h1 className="text-indigo-300 text-3xl mt-2">
          Lägg till övningar, skapa ditt träningspass
        </h1>
        <h2 className="text-indigo-300 text-lg">
          {selectedTheme === "" ? "Alla övningar" : `Alla ${selectedTheme} övningar`}
        </h2>
        <div className="excercises-container">
          <Descriptioncard
            excercise={muscleGroups}
            setSelectedWorkout={setSelectedWorkout}
            selectedWorkout={selectedWorkout}
          />
        </div>
      </div>
      <div className="sidebar">
        <h2 className="theme-headline">Mitt träningspass</h2>
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
                  selectedWorkout={selectedWorkout}
                />
              ))}
              <button className="save-btn" onClick={() => setModalIsOpen(true)}>
                Spara
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Home;
