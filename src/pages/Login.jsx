import LoginUserItem from "../components/LoginUserItem";

function Login({ users, setUserLoggedIn, setModal }) {
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
