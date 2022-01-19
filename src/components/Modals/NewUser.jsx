function NewUser({ setModal }) {
  return (
    <div className="modal-wrapper" onClick={() => setModal("")}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setModal("")} className="close-modal">
          X
        </button>
        <h2>Enter your details</h2>
        <form className="new-user">
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
