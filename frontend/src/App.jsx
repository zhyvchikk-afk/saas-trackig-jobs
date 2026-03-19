import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import RegisterPage from "./pages/RegisterPage";
import api from "./api/axios";

// function App() {
//   useEffect(() => {
//     api.get("/")
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))
//   }, []);

//   return <h1>Дивись консоль🚀</h1>;
// }

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log("APP TOKEN: ", token)

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to={token ? "/jobs" : "/login"} />} />
      <Route 
        path="/login" 
        element={token ? <Navigate to="/jobs" /> : <LoginPage setToken={setToken} />} />
      <Route 
        path="/register"
        element={token ? <Navigate to="/jobs"/> : <RegisterPage />} />
      <Route 
        path="/jobs" 
        element={token ? <JobsPage setToken={setToken} /> : <Navigate to="/login" />} 
      />

      <Route 
        path="*" 
        element={<Navigate to={token ? "/jobs" : "/login"} />}/>
    </Routes>
  );
}

export default App;