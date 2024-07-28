import { useContext, useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "../api/axios";
import {UserContext} from "../context/userContext";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    email: " ",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError("")
    try {
      const response = await axios.post("/auth/login", userDetails);
      const user = await response?.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }

  return (
    <div className='container form-container'>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        {error && <p className="error">{error}</p>}
        <form onSubmit={loginUser}>
          <input onChange={handleChange} type="email" placeholder="Email" name="email" value={userDetails.email}/>
          <input onChange={handleChange} type="password" placeholder="Password" name="password" value={userDetails.password}/>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
      <div>
        <p>
          Do not have an account? <Link to={"/register"}>Register</Link>
        </p>
        
      </div>
    </div>
  )
}
