import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Modals from "./components/Modals/Modals";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [modal, setModal] = useState("");
  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={
            <Login setUserLoggedIn={setUserLoggedIn} setModal={setModal} />
          }
        />
        <Route
          path="/logged-in"
          element={<Main userLoggedIn={userLoggedIn} />}
        />
      </Routes>
      <Modals modal={modal} setModal={setModal} />
    </div>
  );
}

export default App;
