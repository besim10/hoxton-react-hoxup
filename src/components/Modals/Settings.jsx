function Settings({
  setModal,
  userLoggedIn,
  setUserLoggedIn,
  users,
  setUsers,
}) {
  const deleteAccountFromServer = () => {
    if (confirm("Are u sure ? This cannot be undone.")) {
      fetch(`http://localhost:4000/users/${userLoggedIn.id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then(() => {
          setModal("");
          setUserLoggedIn(null);
          deleteAccountFromState();
        });
    }
  };
  const deleteAccountFromState = () => {
    let updatedUsers = [...users];
    updatedUsers = updatedUsers.filter((user) => user.id !== userLoggedIn.id);
    setUsers(updatedUsers);
  };
  return (
    <div className="modal-wrapper" onClick={() => setModal("")}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setModal("")} className="close-modal">
          X
        </button>
        <h2>Settings</h2>
        <ul>
          <li>
            <button
              onClick={() => {
                setUserLoggedIn(null);
                setModal("");
              }}
              className="user-selection"
            >
              LOG OUT
            </button>
            <button
              onClick={deleteAccountFromServer}
              className="delete-account"
            >
              DELETE ACCOUNT
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Settings;
