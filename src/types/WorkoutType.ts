
import { Excercise } from "./Excercise";

export interface WorkoutType{
    reps:string;
    sets:number;
    vila:number;
    procent:string;
    level:string;
    id:number,
    excersise:Excercise[],
    completed?:boolean,
    date?:Date
}