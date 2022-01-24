import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Main({ userLoggedIn, modal, setModal, users }) {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn === null) navigate("/");
  }, [userLoggedIn, navigate]);
  useEffect(() => {
    if (userLoggedIn === null) return;

    fetch(`http://localhost:4000/conversations?userId=${userLoggedIn.id}`)
      .then((resp) => resp.json())
      .then((conversations) => setConversations(conversations));
  }, [userLoggedIn]);
  useEffect(() => {
    if (params.conversationId) {
      console.log("Fetching...");
      fetch(
        `http://localhost:4000/conversations/${params.conversationId}?_embed=messages`
      )
        .then((resp) => resp.json())
        .then((conversation) => setCurrentConversation(conversation));
    }
  }, [params.conversationId]);

  const usersIHaveNotTalkedToYet = users.filter((user) => {
    // when do I want to keep this user?

    // don't show the currently logged in user
    if (userLoggedIn && user.id === userLoggedIn.id) return false;

    // don't show any users in conversations
    // Is this user's id in the conversations?
    // Is it either in userId or participantId
    for (const conversation of conversations) {
      if (conversation.userId === user.id) return false;
      if (conversation.participantId === user.id) return false;
    }
    // at this point we know this user's id is not anywhere in the conversations
    // so we want to keep it
    return true;
  });
  function createConversation(participantId) {
    fetch("http://localhost:4000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userLoggedIn.id,
        participantId: participantId,
      }),
    })
      .then((resp) => resp.json())
      .then((newConversation) => {
        setConversations([...conversations, newConversation]);
        setModal("");
      });
  }
  function createMessage(text) {
    // create a message on the server ✅

    fetch("http://localhost:4000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userLoggedIn.id,
        messageText: text,
        conversationId: Number(params.conversationId),
      }),
    })
      .then((resp) => resp.json())
      .then((newMessage) => {
        const currentConversationCopy = JSON.parse(
          JSON.stringify(currentConversation)
        );
        currentConversationCopy.messages.push(newMessage);
        setCurrentConversation(currentConversationCopy);
      });

    // update the conversation state
  }
  if (userLoggedIn === null) return <h1>User not signed in...</h1>;

  return (
    <div className="main-wrapper">
      {/* <!-- Side Panel --> */}
      <aside>
        {/* <!-- Side Header --> */}
        <header className="panel">
          <img
            className="avatar"
            width="50"
            height="50"
            src={userLoggedIn.avatar}
            alt=""
          />
          <h3>{`${userLoggedIn.firstName} ${userLoggedIn.lastName}`}</h3>
          <button
            onClick={() => setModal("settings")}
            className="panel-settings__button"
          >
            ⚙️
          </button>
        </header>

        {/* <!-- Search form --> */}
        <form className="aside__search-container">
          <input
            type="search"
            name="messagesSearch"
            placeholder="Search chats"
          />
        </form>

        {/* <!-- 

        Side Chat List goes here. Check side-chat-list.html

        -->
                <!--  --> */}
        <ul>
          {/* <!-- This first item should always be present --> */}
          <li>
            <button
              onClick={() => {
                setModal("new-chat");
              }}
              className="chat-button"
            >
              <div>
                <h3>+ Start a new Chat</h3>
              </div>
            </button>
          </li>
          {conversations.map((conversation) => {
            // which id am I talking to
            const talkingToId =
              userLoggedIn.id === conversation.userId
                ? conversation.participantId
                : conversation.userId;

            // what are their details?
            const talkingToUser = users.find((user) => user.id === talkingToId);

            return (
              <li key={conversation.id}>
                <button
                  onClick={() => navigate(`/logged-in/${conversation.id}`)}
                  className="chat-button"
                >
                  <img
                    className="avatar"
                    height="50"
                    width="50"
                    alt=""
                    src={talkingToUser.avatar}
                  />
                  <div>
                    <h3>{`${talkingToUser.firstName} ${talkingToUser.lastName}`}</h3>
                    <p>Last message</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {params.conversationId && currentConversation !== null ? (
        <main className="conversation">
          {/* <!-- Chat header --> */}
          <header className="panel"></header>

          <ul className="conversation__messages">
            {currentConversation.messages.map((message) => {
              return (
                <li
                  key={message.id}
                  className={
                    message.userId === userLoggedIn.id ? "outgoing" : "incoming"
                  }
                >
                  <p>{message.messageText}</p>
                </li>
              );
            })}
          </ul>

          {/* <!-- Message Box --> */}
          <footer>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMessage(e.target.text.value);
                e.target.reset();
              }}
              className="panel conversation__message-box"
            >
              <input
                type="text"
                placeholder="Type a message"
                required
                autoComplete="off"
                name="text"
              />
              <button type="submit">
                {/* <!-- This is the send button --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
                  ></path>
                </svg>
              </button>
            </form>
          </footer>
        </main>
      ) : null}
      {modal === "new-chat" ? (
        <div className="modal-wrapper" onClick={() => setModal("")}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal("")} className="close-modal">
              X
            </button>
            <h2>Pick a user to talk to</h2>
            {usersIHaveNotTalkedToYet.length > 0 ? (
              <ul>
                {usersIHaveNotTalkedToYet.map((user) => (
                  <li key={user.id}>
                    <button
                      onClick={() => {
                        createConversation(user.id);
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
            ) : (
              <p>No new person to talk to</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default Main;
