import NewUser from "./NewUser";

function Modals({ modal, setModal, users, setUsers }) {
  return (
    <div>
      {modal === "new-user" && (
        <NewUser users={users} setUsers={setUsers} setModal={setModal} />
      )}
    </div>
  );
}
export default Modals;
