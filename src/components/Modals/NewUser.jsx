function NewUser({ setModal, users, setUsers }) {
  const addUserToState = (user) => {
    let copyOfUsers = JSON.parse(JSON.stringify(users));
    copyOfUsers.push(user);
    setUsers(copyOfUsers);
  };
  const addUserToServer = (user) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then(setModal(""))
      .then((userFromServer) => addUserToState(userFromServer));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.firstName.value;
    const surname = e.target.lastName.value;
    const phoneNumber = e.target.phoneNumber.value;

    addUserToServer({
      firstName: name,
      lastName: surname,
      phoneNumber: phoneNumber,
      avatar: `https://avatars.dicebear.com/api/avataaars/${name}${surname}.svg`,
    });
  };

  return (
    <div className="modal-wrapper" onClick={() => setModal("")}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setModal("")} className="close-modal">
          X
        </button>
        <h2>Enter your details</h2>
        <form onSubmit={handleSubmit} className="new-user">
          <label htmlFor="firstName">First name</label>
          <input name="firstName" id="firstName" type="text" />
          <label htmlFor="lastName">Last name</label>
          <input name="lastName" id="lastName" type="text" />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input name="phoneNumber" id="phoneNumber" type="text" />
          <button type="submit">CREATE USER</button>
        </form>
      </div>
    </div>
  );
}
export default NewUser;
