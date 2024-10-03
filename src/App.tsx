import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import { Excercise } from './types/Excercise'
import MyPage from './Pages/MyPage'
import { useEffect, useState } from 'react'
import Excercises from './Pages/ExcercisePage'
import ExcerciseContext from './context/ExcerciseContext'

const App=()=> {
  
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
      <Route path='/' element={<Home/>}>
      <Route path='/excercises' element={<Excercises/>}/>
      <Route path='/myPage' element={<MyPage/>}/>
      </Route>
     </Routes>
     </BrowserRouter>
     </ExcerciseContext.Provider>
    </>
  )
}

export default App
