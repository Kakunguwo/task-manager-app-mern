import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "../api/axios";

export default function EditTask() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { id } = useParams();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    console.log(taskDetails);
  };
  useEffect(() => {
    const getTask = async (id) => {
      try {
        const response = await axios.get(`/task/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTaskDetails(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTask(id);
  }, [id, token]);

  const updateTask = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      const response = await axios.patch(`/task/${id}`, taskDetails, {withCredentials: true, headers: {
        Authorization: `Bearer ${token}`
      }});
      if(!response?.data) {
        setErrors("Failed to update task")
      }
      navigate("/");
    } catch (error) {
      setErrors(error.response?.data?.message);
    }
  }


  return (
    <div className="container form-container">
      <div>
        <h2>Edit</h2>
      </div>
      <div className="form">
      {errors && <p className="error">{errors}</p>}
        <form onSubmit={updateTask}>
          <textarea
            rows={2}
            onChange={handleChange}
            type="email"
            placeholder="Title"
            name="title"
            value={taskDetails.title}
            autoFocus
          />
          <textarea
            rows={6}
            onChange={handleChange}
            type="text"
            placeholder="Description"
            name="description"
            value={taskDetails.description}
          />
          <button type="submit">Update Task</button>
        </form>
      </div>
    </div>
  );
}
