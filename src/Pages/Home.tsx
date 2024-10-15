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
      <div className="central-content bg-zinc-900">
        <h1 className="text-indigo-300 text-3xl mt-2">Vad vill du träna?</h1>
        <div className="flex gap-4">
          {themes.map((theme, index) => (
            <button
              className="py-3 px-5 bg-zinc-700 rounded-md text-indigo-500 w-28 text-center text-lg hover:bg-zinc-800"
              key={index}
              onClick={() => handleButtonClick(theme.kroppsdel)}
            >
              {theme.kroppsdel}
            </button>
          ))}
        </div>

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
      <div className="sidebar bg-zinc-900">
        <h2 className="theme-headline mt-48">Mitt träningspass</h2>
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
