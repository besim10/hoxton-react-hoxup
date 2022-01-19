import NewUser from "./NewUser";

function Modals({ modal, setModal }) {
  return <div>{modal === "new-user" && <NewUser setModal={setModal} />}</div>;
}
export default Modals;
