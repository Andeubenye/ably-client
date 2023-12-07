// importing external style
import { useEffect, useState } from "react";
import { styles } from "./../styles";
import InitiateChat from "./InitiateChat";
import { ThreeDots } from "react-loader-spinner";
import ChatWindow from "./ChatWindow";
import { ablyConfig } from "../config";

// Creating a connection to ably
const Ably = require("ably");

var pageDisplayOptions = {
  loading: (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeDots color="#ee6e46" height="100" width="100" />
    </div>
  ),
};

function ModalWindow(props) {
  // state variables
  const [pageDisplay, setPageDisplay] = useState("initiateChat");

  // state variables for ably
  const [channelID, setChannelID] = useState(null);
  const [allChannelMessages, setAllChannelMessages] = useState([]);

  // ably variables
  var realtime = null;
  var channel = null;

  // custom sleep function
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // opening a connection with ably
  const openAblyConnection = (email = channelID) => {
    // persisting the email as the channel id
    setChannelID(email);
    // creating the connection to ably
    realtime = new Ably.Realtime({
      key: ablyConfig.api_key,
    });

    // creating a channel
    channel = realtime.channels.get(`livechat:${email}`);

    // attaching to channel
    channel.attach(function (err) {
      // displaying the chat interface
      setPageDisplay("chatWindow");
      // getting channel messages if any
      getChannelMessages();
      // creating a listener to check for new messages anytime a message is sent with name "Support"
      channel.subscribe("Support", function (message) {
        // calling method that handles new messages
        handleNewMessage(message);
        // console.log("new message:" + message);
      });
    });
  };

  // function to send messages
  const sendMessageViaAbly = (message) => {
    if (channel == null) {
      openAblyConnection();
    }

    var message_structure = { type: "text", data: message };
    channel.publish("Client", message_structure, function (err) {
      alert("message sent");
      // updating channel messages
      getChannelMessages();
    });
  };

  // function to send typing notification
  const sendTypingNotification = async () => {
    if (channelID == null) {
      return;
    }
    if (channel == null) {
      console.log("channel is empty");
      openAblyConnection(channelID);
    }

    // checking first if the last message sent was a typing notification
    if (allChannelMessages.length != 0) {
      if (
        allChannelMessages[0].name == "Client" &&
        allChannelMessages[0].data["type"] == "typing"
      ) {
        return;
      }
    }

    console.log("after getting channel messages");
    var message_structure = { type: "typing" };
    channel.publish("Client", message_structure, function (err) {
      // updating channel messages
      getChannelMessages();
    });
  };

  // function to get channel messages
  const getChannelMessages = () => {
    if (channel == null) {
      openAblyConnection();
    }
    // loading the channel messages via "history"
    channel.history(function (err, resultPage) {
      // updating the state variable
      setAllChannelMessages(resultPage.items);
      // console.log(resultPage.items);
    });
  };

  // handle new messages
  const handleNewMessage = (message) => {
    // to implement "typing" indicator
    if (message.data.type == "typing") {
      // display typing here
      getChannelMessages();
    } else if (message.data.type == "text") {
      // loading/updating messages list
      getChannelMessages();
    } else if (message["name"] == "Support") {
      // loading/updating messages list
      getChannelMessages();
    }
  };

  // adding sections to page display options
  pageDisplayOptions["initiateChat"] = (
    <InitiateChat
      onEmailSubmit={(email) => {
        setPageDisplay("loading");
        // telling function to wait half a second before making request
        sleep(500).then(() => {
          openAblyConnection(email);
        });
      }}
    />
  );
  pageDisplayOptions["chatWindow"] = (
    <ChatWindow
      allChannelMessages={allChannelMessages}
      onMessageSubmit={(message) => sendMessageViaAbly(message)}
      sendTypingNotification={() => sendTypingNotification()}
    />
  );

  // returning display
  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      {pageDisplayOptions[pageDisplay]}
    </div>
  );
}

export default ModalWindow;
