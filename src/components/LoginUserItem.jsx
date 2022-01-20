import { useNavigate } from "react-router-dom";

function LoginUserItem({ user, setUserLoggedIn }) {
  const navigate = useNavigate();
  const getUserLoggedIn = () => {
    fetch(`http://localhost:4000/users/${user.id}`)
      .then((resp) => resp.json())
      .then((userFromServer) => setUserLoggedIn(userFromServer))
      .then(() => navigate("/logged-in"));
  };
  return (
    <li>
      <button onClick={getUserLoggedIn} className="user-selection">
        <img
          className="avatar"
          width="50"
          height="50"
          src={user.avatar}
          alt="avatar"
        />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
      </button>
    </li>
  );
}
export default LoginUserItem;
