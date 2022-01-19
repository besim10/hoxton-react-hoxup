import { useEffect, useState } from "react";
import LoginUserItem from "../components/LoginUserItem";

function Login({ setUserLoggedIn, setModal }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users/")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);
  return (
    <div className="main-wrapper login">
      <section className="login-section">
        <h2>Choose your user!</h2>
        <ul>
          {users.map((user) => (
            <LoginUserItem
              setUserLoggedIn={setUserLoggedIn}
              key={user.id}
              user={user}
            />
          ))}
          <li>
            <button className="user-selection">
              <h3
                onClick={() => {
                  setModal("new-user");
                }}
              >
                + Add a new user
              </h3>
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
export default Login;
