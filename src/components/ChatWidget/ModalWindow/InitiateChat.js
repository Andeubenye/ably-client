import { useState } from "react";
import { styles } from "../styles";
import { colors } from "../config";
// import icon
import { BsPersonCircle } from "react-icons/bs";

function InitiateChat({ onEmailSubmit }) {
  // state variables
  const [email, setEmail] = useState(null);
  // function on form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    onEmailSubmit && onEmailSubmit(email);
  };

  return (
    <div>
      <div style={{ marginTop: 90 }}>
        <BsPersonCircle size={80} color={colors.primary} />

        {/* Form */}
        <div style={{ display: "contents" }}>
          <form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: "15%" }}>
            <input
              style={styles.emailInput}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <h2 style={{ textAlign: "center" }}>
              Enter email address to <br />
              get started.
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InitiateChat;
