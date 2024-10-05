import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import { Excercise } from './types/Excercise'
import MyPage from './Pages/MyPage'
import { useEffect, useState } from 'react'
import Excercises from './Pages/ExcercisePage'
import ExcerciseContext from './context/ExcerciseContext'
import MyWorkoutContext from './context/myWorkoutcontext'
import { WorkoutType } from './types/WorkoutType'
const App=()=> {
  const [myWorkouts, setMyWorkouts]= useState<WorkoutType[]>([])
  const [excercises,setExcercises]=useState<Excercise[]>([]);
  useEffect(()=>{
  fetch("../excercise.json")
  .then(res=>res.json())
  .then(data=>setExcercises(data))
  },[])
  return (
    <>
    <ExcerciseContext.Provider value={{excercises}}>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      
      <Route path='/' element={
        <MyWorkoutContext.Provider value={{myWorkouts, setMyWorkouts}}>
        <Home/>
        </MyWorkoutContext.Provider>
    }/>
      <Route path='/myPage' element={<MyWorkoutContext.Provider value={{myWorkouts, setMyWorkouts}}>
        <MyPage/>
        </MyWorkoutContext.Provider>}/>
     
      <Route path='/excercises' element={<Excercises/>}/>
     </Routes>
     </BrowserRouter>
     </ExcerciseContext.Provider>
    </>
  )
}

export default App
