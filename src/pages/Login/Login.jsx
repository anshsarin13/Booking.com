import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = ({setUser}) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));  ;
    };


  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:credentials.username,password:credentials.password}), // body data type must match "Content-Type" header

      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        //save the auth-token and redirect
        localStorage.setItem('access_token',json.token);
       localStorage.setItem('user', JSON.stringify({ username: json.username }));
        navigate("/");
        console.log('User Data Set:', { username: json.username });
        setUser({ username: json.username });      }
      }

  
  return (
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
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading}  className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
      </form>
    </div>
  );
};

export default Login;