import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Excercise } from "./types/Excercise";
import MyPage from "./Pages/MyPage";
import { useEffect, useState } from "react";
import Excercises from "./Pages/ExcercisePage";
import ExcerciseContext from "./context/ExcerciseContext";
import MyWorkoutContext from "./context/myWorkoutcontext";
import { WorkoutType } from "./types/WorkoutType";
import { ToastContainer } from "react-toastify";
import IdContext from "./context/IdContext";
const App = () => {
  const [myWorkouts, setMyWorkouts] = useState<WorkoutType[]>([]);
  const [excercises, setExcercises] = useState<Excercise[]>([]);
  const [id, SetId]=useState<number>(1)
  useEffect(() => {
    fetch("../excercise.json")
      .then((res) => res.json())
      .then((data) => setExcercises(data));
  }, []);
  return (
    <>
      <ToastContainer theme="dark" position="top-center" autoClose={5000} />
      <IdContext.Provider value={{id,SetId}}>
      <ExcerciseContext.Provider value={{ excercises }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <MyWorkoutContext.Provider value={{ myWorkouts, setMyWorkouts }}>
                  <Home />
                </MyWorkoutContext.Provider>
              }
            />
            <Route path="/myPage" element={<MyPage />} />
            <Route
              path="/excercises"
              element={
                <MyWorkoutContext.Provider value={{ myWorkouts, setMyWorkouts }}>
                  <Excercises />
                </MyWorkoutContext.Provider>
              }
            />
          </Routes>
        </BrowserRouter>
      </ExcerciseContext.Provider>
      </IdContext.Provider>
    </>
  );
};

export default App;
