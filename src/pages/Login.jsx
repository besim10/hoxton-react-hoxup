import { useEffect, useState } from "react";
import LoginUsersList from "../components/LoginUsersList";

function Login({ setUserLoggedIn }) {
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
            <LoginUsersList
              setUserLoggedIn={setUserLoggedIn}
              key={user.id}
              user={user}
            />
          ))}
          <li>
            <button className="user-selection">
              <h3>+ Add a new user</h3>
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
export default Login;
