import NewChat from "./NewChat";
import NewUser from "./NewUser";

function Modals({
  modal,
  setModal,
  users,
  setUsers,
  userLoggedIn,
  setSelectedUsersToTalk,
}) {
  return (
    <div>
      {modal === "new-user" ? (
        <NewUser users={users} setUsers={setUsers} setModal={setModal} />
      ) : null}
      {modal === "new-chat" ? (
        <NewChat
          setModal={setModal}
          userLoggedIn={userLoggedIn}
          setSelectedUsersToTalk={setSelectedUsersToTalk}
        />
      ) : null}
    </div>
  );
}
export default Modals;
