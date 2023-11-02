import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import List from "./pages/List/List.jsx";
import Hotel from "./pages/Hotel/Hotel.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { useState } from "react";





function App(props) {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home user={user}/>}/>
      <Route exact path="/hotels" element={<List user={user}/>}/>
      <Route exact path="/hotels/:id" element={<Hotel user={user}/>}/>
      <Route path="/login" element={ <Login setUser={setUser} />}/>
      <Route path="/register" element={<Register/>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
