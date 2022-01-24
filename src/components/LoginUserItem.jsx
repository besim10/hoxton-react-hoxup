import { useNavigate } from "react-router-dom";

function LoginUserItem({ user, setUserLoggedIn }) {
  const navigate = useNavigate();

  return (
    <li>
      <button
        onClick={() => {
          setUserLoggedIn(user);
          navigate("/logged-in");
        }}
        className="user-selection"
      >
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
