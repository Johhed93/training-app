import { createContext } from 'react'
import { Excercise } from '../types/Excercise'


const ExcerciseContext= createContext<{excercises: Excercise[]}>({excercises:[]})
export default ExcerciseContext