import { Link } from "react-router-dom"

interface Navlinks {
to:string,
name:string
}
const Navbar= ()=>{
const navlinks:Navlinks[]=[
    {
        to:"/",
        name:"Home"
    },
    {
        to:"/excercises",
        name:"Excercises"
    },
    {
        to:"/myPage",
        name:"My page"
    }
]

return(
<header className="flex justify-center items-center p-6 bg-zinc-900">
<nav className="flex justify-between items-center w-11/12 ">
    <div className="py-2 px-3.5 bg-zinc-700 text-xl text-indigo-300 rounded-md">Tränings app</div>
    <ul className="flex gap-x-3.5">{navlinks.map((link,index)=>(
        <li key={index}>
            <Link to={link.to} className="text-indigo-500 text-lg">{link.name}</Link>
        </li>
    ))
        
        }
        
    </ul>
</nav>
</header>
)
}
export default Navbar