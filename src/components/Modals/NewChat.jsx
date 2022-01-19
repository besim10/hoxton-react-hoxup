import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

function NewChat({ setModal, userLoggedIn, setSelectedUsersToTalk }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((resp) => resp.json())
      .then((usersFromServer) => setUsers(usersFromServer));
  }, []);

  const usersToShow = () => {
    let copyOfUsers = users;
    copyOfUsers = copyOfUsers.filter((user) => user.id !== userLoggedIn.id);
    return copyOfUsers;
  };

  const addConversationToServer = (conversation) => {
    fetch("http://localhost:4000/conversations/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversation),
    })
      .then((resp) => resp.json())
      .then((conversationFromServer) =>
        setSelectedUsersToTalk.push(conversationFromServer)
      )
      .then(setModal(""));
  };
  return (
    <div className="modal-wrapper" onClick={() => setModal("")}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setModal("")} className="close-modal">
          X
        </button>
        <h2>Pick a user to talk to</h2>
        <ul>
          {usersToShow().map((user) => (
            <li>
              <button
                onClick={() => {
                  addConversationToServer({
                    userId: userLoggedIn.id,
                    participantId: user.id,
                  });
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
          ))}
        </ul>
      </div>
    </div>
  );
}
export default NewChat;
