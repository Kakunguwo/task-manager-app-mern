import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "../api/axios";

export default function Home() {
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const [tasks, setTasks] = useState([]);

  const userId = currentUser?.userWithOutPass?._id;

  useEffect(()=> {
    if(!token){
      navigate("/login")
    }
  }, [navigate, token]);

  useEffect(() => {
    const getTasks = async (userId) => {
      try {
        const response = await axios.get(`/task/user/${userId}`, {withCredentials: true, headers: {
          Authorization: `Bearer ${token}`
        }});

        setTasks(response?.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTasks(userId);
  }, [userId, token]);


  return (
    <div className="container home">
      <div className="home-top">
        <h2>My Tasks</h2>
        <Link to={"/create"}>
          <button className="btn">Add Task</button>
        </Link>
      </div>
      <div className="task-table">
        <TaskTable data={tasks}/>
      </div>
    </div>
  );
}
