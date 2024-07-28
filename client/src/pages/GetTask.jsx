import {useContext, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "../api/axios";
import DeleteTask from "./DeleteTask";


export default function GetTask() {
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const [task, setTask] = useState({});
  const {id} = useParams();

  useEffect(()=> {
    if(!token){
      navigate("/login")
    }
  }, [navigate, token]);

  useEffect(() => {
    const getTask = async (id) => {
      try {
        const response = await axios.get(`/task/${id}`, {withCredentials: true, headers: {
          Authorization: `Bearer ${token}`
        }});
        setTask(response?.data);

      } catch (error) {
        console.log(error);
      }
    } 

    getTask(id);
  } , [id, token])

  return (
    <div className="get-task">
      <div className="task-title">
        <h2>Title: {task.title}</h2>
      </div>
      <div className="task-desc">
        <p>Description: {task.description}</p>
      </div>
      <div className="task-status">
        <small>Status: {task.status}</small>
      </div>
      <div className="task-actions">
        <Link to={`/tasks/${task?._id}/edit`}>
          <button className="edit-btn">Edit</button>
        </Link>
        <DeleteTask id={task?._id}/>
      </div>
    </div>
  );
}
