import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  return (
    <Routes>
      <Route index element={<Navigate replace to="/login" />} />
      <Route
        path="/login"
        element={<Login setUserLoggedIn={setUserLoggedIn} />}
      />
      <Route path="/logged-in" element={<Main userLoggedIn={userLoggedIn} />} />
    </Routes>
  );
}

export default App;
