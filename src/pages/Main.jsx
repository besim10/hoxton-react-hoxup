import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Main({ userLoggedIn, setModal, users, selectedUsersToTalk }) {
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversations, setConversations] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn === null) navigate("/");
  }, [userLoggedIn, navigate]);
  useEffect(() => {
    if (params.conversationId) {
      fetch(
        `http://localhost:4000/conversations/${params.conversationId}?_embed=messages`
      )
        .then((resp) => resp.json())
        .then((conversation) => setCurrentConversation(conversation));
    }
  }, [params.conversationId]);
  useEffect(() => {
    if (userLoggedIn === null) return;

    fetch(`http://localhost:4000/conversations?userId=${userLoggedIn.id}`)
      .then((resp) => resp.json())
      .then((conversations) => setConversations(conversations));
  }, [userLoggedIn]);
  function getOutGoingMessages() {
    let outGoingMessages = [];
    outGoingMessages = currentConversation.messages.filter(
      (message) => message.userId === currentConversation.userId
    );
    return outGoingMessages;
  }
  function getRecivedMessages() {
    let recivedMessages = [];
    recivedMessages = currentConversation.messages.filter(
      (message) => message.userId !== currentConversation.userId
    );
    return recivedMessages;
  }
  if (userLoggedIn === null) return <h1>User not signed in...</h1>;
  console.log(currentConversation);
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
            value=""
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

      {/* <!-- Main Chat Section --> */}
      {params.conversationId && currentConversation !== null ? (
        <main className="conversation">
          {/* <!-- Chat header --> */}
          <header className="panel"></header>

          <ul className="conversation__messages">
            {getOutGoingMessages().map((currentConversation) => {
              return (
                <li key={currentConversation.id} className="outgoing">
                  <p>{currentConversation.messageText}</p>
                </li>
              );
            })}
            {getRecivedMessages().map((currentConversation) => {
              return (
                <li key={currentConversation.id}>
                  <p>{currentConversation.messageText}</p>
                </li>
              );
            })}
          </ul>

          {/* <!-- Message Box --> */}
          <footer>
            <form className="panel conversation__message-box">
              <input type="text" placeholder="Type a message" value="" />
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
    </div>
  );
}
export default Main;
