import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email:"",
    password:"",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: credentials.username, email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        //save the auth-token and redirect
        localStorage.setItem('access_token',json.token);
        navigate("/login");
      


    }
}

  return (
    <div>
<div className="login">
<form onSubmit={handleSubmit}>

      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"

        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"

        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"

        />
        <button  className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </form>
    </div> 
       </div>
  )
}
