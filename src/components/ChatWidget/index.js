import { useState, useRef, usEffect, useEffect } from "react";
// import icon
import { BsFillChatFill } from "react-icons/bs";
// importing external style
import { styles } from "./styles";
import ModalWindow from "./ModalWindow";

function ChatWidget() {
  // state variable to track modal visibility
  const [visible, setVisible] = useState(false);
  // state variable to track if widget button was hovered on
  const [hovered, setHovered] = useState(false);
  // ref
  const widgetRef = useRef(null);

  // use effect
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [widgetRef]);

  return (
    // Container
    <div ref={widgetRef}>
      {/* Modal Window */}
      <ModalWindow visible={visible} />

      {/* Chat Widget */}
      <div
        onClick={() => setVisible(!visible)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatWidget,
          ...{ border: hovered ? "1px solid white" : "" },
        }}
      >
        {/* Inner Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ButtonIcon */}
          <BsFillChatFill size={20} color="white" />

          {/* Button Text */}
          <span style={styles.chatWidgetText}>Chat Now!!</span>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
