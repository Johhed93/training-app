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
<header className="flex justify-center items-center p-6 bg-black border-b-2 border-white">
<nav className="flex justify-between items-center w-10/12 ">
    <img src="https://cdn.pixabay.com/photo/2017/02/15/00/48/logo-2067396_1280.png" alt="" className="max-w-16" />
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