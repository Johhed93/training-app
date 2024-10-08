import { createContext } from "react"
interface IdInterface{
    id:number,
    SetId:React.Dispatch<React.SetStateAction<number>>
}
const IdContext = createContext<IdInterface>({}as IdInterface)
export default IdContext