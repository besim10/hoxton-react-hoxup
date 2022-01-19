import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Modals from "./components/Modals/Modals";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [modal, setModal] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users/")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);
  console.log(users);
  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={
            <Login
              setUserLoggedIn={setUserLoggedIn}
              setModal={setModal}
              users={users}
            />
          }
        />
        <Route
          path="/logged-in"
          element={<Main userLoggedIn={userLoggedIn} />}
        />
      </Routes>
      <Modals
        modal={modal}
        setModal={setModal}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default App;
