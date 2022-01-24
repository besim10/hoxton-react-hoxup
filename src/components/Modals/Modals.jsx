import NewUser from "./NewUser";
import Settings from "./Settings";
function Modals({
  modal,
  setModal,
  users,
  setUsers,
  userLoggedIn,
  setUserLoggedIn,
}) {
  switch (modal) {
    case "new-user":
      return <NewUser users={users} setUsers={setUsers} setModal={setModal} />;
    case "settings":
      return (
        <Settings
          setModal={setModal}
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          users={users}
          setUsers={setUsers}
        />
      );
    default:
      return null;
  }
}
export default Modals;
