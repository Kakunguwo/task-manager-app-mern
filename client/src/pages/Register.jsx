import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });

  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/auth/register", userDetails);
      const newUser = await response?.data;
      if(!newUser){
        setError("Failed to register user");
      }
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  return (
    <div className='container form-container'>
      <div>
        <h2>Register</h2>
      </div>
      <div>
        <form onSubmit={registerUser}>
        {error && <p className="error">{error}</p>}
          <input onChange={handleChange} type="text" placeholder="Name" name="name" value={userDetails.name}/>
          <input onChange={handleChange} type="email" placeholder="Email" name="email" value={userDetails.email}/>
          <input onChange={handleChange} type="password" placeholder="Password" name="password" value={userDetails.password}/>
          <input onChange={handleChange} type="password" placeholder="Confirm Password" name="confirmPassword" value={userDetails.confirmPassword}/>
          <button type="submit">
            Register
          </button>
        </form>
      </div>
      <div>
        <p>
          Have an account? <Link to={"/login"}>Login</Link>
        </p>
        
      </div>
    </div>
  )
}
