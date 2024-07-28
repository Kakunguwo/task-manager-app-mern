import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import PropsTypes from "prop-types";

export default function DeleteTask({ id }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`/task/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status === 200) {
       
          navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link to={`/tasks/${id}/delete`} onClick={()=> deleteTask(id)}>
        <button className="delete-btn">Delete</button>
      </Link>
    </>
  );
}

DeleteTask.propTypes = {
  id: PropsTypes.string.isRequired,
}
