import { colors } from "./config";

export const styles = {
  chatWidget: {
    // Position
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: colors.primary,
    // Padding
    paddingLeft: "18px",
    paddingRight: "18px",
    paddingTop: "7px",
    paddingBottom: "7px",
    // Border
    borderRadius: "10px",
    cursor: "pointer",
  },
  chatWidgetText: {
    color: "white",
    fontSize: "15px",
    marginLeft: "5px",
  },

  modalWindow: {
    // Position
    position: "fixed",
    bottom: "70px",
    right: "20px",
    // Size
    width: "370px",
    // width: "420px",
    height: "65vh",
    maxWidth: "calc(100% - 48px)",
    maxHeight: "calc(100% - 48px)",
    backgroundColor: "white",
    // Border
    borderRadius: "12px",
    border: `2px solid ${colors.primary}`,
    overflow: "hidden",
    // Shadow
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },

  initiateChatWindow: {
    width: "100%",
    overflow: "hidden",
    transition: "all 0.5s ease",
    WebkitTransition: "all 0.5s ease",
    MozTransition: "all 0.5s ease",
  },
  stripe: {
    position: "fixed",
    top: "-55px",
    width: "100%",
    height: "308px",
    backgroundColor: colors.primary,
    transform: "skewY(-12deg)",
  },
  emailInput: {
    width: "65%",
    textAlign: "center",
    outline: "none",
    padding: "12px",
    borderRadius: "12px",
    border: `2px solid ${colors.primary}`,
  },

  chatWindow: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatWindowHeader: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 15,
    padding: 10,
    backgroundColor: colors.primary,
  },
  brandLogoContainer: {
    width: 40,
    height: 35,
    borderRadius: 40,
    backgroundColor: "white",
  },
  headerRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
  },

  chatWindowBody: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column-reverse",
    overflow: "scroll",
    padding: 15,
  },
  supportMessageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginRight: 0,
  },
  supportMessageBox: {
    backgroundColor: "lightgrey",
    marginTop: 10,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 6,
    maxWidth: "60%",
  },
  clientMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 0,
  },
  clientMessageBox: {
    backgroundColor: colors.primary,
    color: "white",
    marginTop: 10,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 6,
    maxWidth: "60%",
  },

  chatWindowFooter: {
    borderTop: "2px dotted red",
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 10,
  },
  messageInputContainer: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
  },
  messageInput: {
    width: "100%",
    // textAlign: "center",
    fontSize: 16,
    outline: "none",
    padding: "12px",
    borderRadius: "12px",
    border: `2px solid transparent`,
    paddingRight: 20,
  },
};
