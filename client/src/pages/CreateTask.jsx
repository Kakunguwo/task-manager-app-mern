import { useState,useContext, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import { UserContext } from "../context/userContext";
import axios from "../api/axios";


export default function CreateTask() {

  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;


  useEffect(()=> {
    if(!token){
      navigate("/login")
    }
  }, [navigate, token])

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setTaskDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });

    console.log(taskDetails);
  }

  const createTask = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/task/create", taskDetails, {withCredentials: true, headers: {
        Authorization: `Bearer ${token}`
      }});
      if(!response?.data){
        setError("Failed to create tasks")
      }
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  return (
    <div className='container form-container'>
      <div>
        <h2>CreateTask</h2>
      </div>
      <div className="form">
      {error && <p className="error">{error}</p>}
        <form onSubmit={createTask}>
          <textarea rows={2} onChange={handleChange} type="email" placeholder="Title" name="title" value={taskDetails.title} autoFocus/>
          <textarea rows={6} onChange={handleChange} type="text" placeholder="Description" name="description" value={taskDetails.description}/>
          <button type="submit">
            Create Task
          </button>
        </form>
      </div>
    </div>
  )
}
