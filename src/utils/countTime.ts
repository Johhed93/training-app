
import { WorkoutType } from "../types/WorkoutType";

const countTime=(arr: WorkoutType):string=>{
const count:number= arr.sets*(arr.vila*60)*arr.excersise.length;
const minutes = Math.floor(count / 60);
const seconds = count - minutes * 60;
return `${minutes} minuter ${seconds===0? "": `och ${seconds} sekunder`}`
}
export default countTime