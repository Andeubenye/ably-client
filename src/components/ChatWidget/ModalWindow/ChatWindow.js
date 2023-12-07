import { useEffect, useState } from "react";
import { styles } from "../styles";
// import icon
import { BsPrinterFill, BsSendPlus } from "react-icons/bs";
import { colors } from "../config";
import { ThreeDots, ThreeCircles } from "react-loader-spinner";

function ChatWindow({
  allChannelMessages,
  onMessageSubmit,
  sendTypingNotification,
}) {
  // state variables
  const [message, setMessage] = useState(null);
  // function on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // returning the value to the parent component
    onMessageSubmit && onMessageSubmit(message);
    // resetting the input field
    setMessage("");
  };

  // style objects
  const containerSpecificStyle = {
    Support: styles.supportMessageContainer,
    Client: styles.clientMessageContainer,
  };
  const boxSpecificStyle = {
    Support: styles.supportMessageBox,
    Client: styles.clientMessageBox,
  };

  // message component
  const MessageComponent = ({ message, index }) => {
    let date = new Date(message.data);
    console.log("Milliseconds = " + date.toString());

    if (message.data.type == "typing") {
      if (index == 0 && message.name == "Support") {
        return <ThreeDots color="#ee6e46" height="50" width="50" />;
      } else {
        return <></>;
      }
    }

    return (
      <>
        {/* Date/time */}
        <div
          style={{
            textAlign: message.name == "Client" ? "right" : "left",
            fontSize: 9,
            color: "grey",
          }}
        >
          {message.name == "Support" && "Support"}
          {/* {message.name == "Client" && "You"} */}
        </div>

        {/* Message box */}
        <div style={containerSpecificStyle[message.name]}>
          <div style={boxSpecificStyle[message.name]}>
            {message.name == "Support" &&
              message.data.type == "text" &&
              message.data.data}
            {message.name == "Client" &&
              message.data.type == "text" &&
              message.data.data}
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={styles.chatWindow}>
      {/* Header */}
      <div style={styles.chatWindowHeader}>
        <div style={styles.brandLogoContainer}></div>
        <div style={styles.headerRow}>
          <div style={styles.headerText}>Live Chat</div>
          <BsPrinterFill
            size={25}
            color={"white"}
            onClick={() => alert("Write download logic here")}
          />
        </div>
      </div>

      {/* Body */}
      <div style={styles.chatWindowBody}>
        {allChannelMessages.map((message, index) => (
          <MessageComponent key={index} message={message} index={index} />
        ))}
      </div>

      {/* Chat Input */}
      <div style={styles.chatWindowFooter}>
        {/* Form */}
        <div style={styles.messageInputContainer}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ display: "flex", flexGrow: 1, flexShrink: 1 }}
          >
            <input
              style={styles.messageInput}
              onChange={(e) => {
                setMessage(e.target.value);
                sendTypingNotification && sendTypingNotification();
              }}
              placeholder="Send a message..."
              value={message}
            />
          </form>
        </div>
        <BsSendPlus
          size={25}
          color={colors.primary}
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
}

export default ChatWindow;
