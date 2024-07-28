import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext);
    setCurrentUser(null);
    navigate("/login");
  return (
    <>

    </>
  )
}
