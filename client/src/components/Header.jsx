import{ useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Header() {
  const {currentUser} = useContext(UserContext);
  return (
    <div>
      {currentUser? (
        <div className="container header">
      <div>
      <Link>
      <h2>TaskApp</h2>
      </Link>
      </div>
      <div>
        <Link to={"/logout"}>
          <button className="btn">Logout</button>
        </Link>
      </div>
    </div>
  )
 : (
        <div className="container header">
      <div>
      <Link>
      <h2>TaskApp</h2>
      </Link>
      </div>
      <div>
        <Link to={"/login"}>
          <button className="btn">Login</button>
        </Link>
      </div>
    </div>
  )
  }
    </div>
  )
    
}
