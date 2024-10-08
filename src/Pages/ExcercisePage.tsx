import "../App.css";
import MyWorkoutList from "../components/MyWorkoutList";

const MyWorkoutPage = () => {
  
  return (
    <div className="root-wrapper">
      <div className="sidebar"></div>
      <div className="central-content">
        <h1 className="text-indigo-300 text-3xl mt-2">Mina Treningspass</h1>
        <div className="excercises-container">
        {<MyWorkoutList />}
        </div>
       
        </div>
    </div>
  );
};
export default MyWorkoutPage;
