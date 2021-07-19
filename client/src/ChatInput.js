import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./ChatInput.css";
import { useStateValue } from "./StateProvider";
import axios from "./axios";
function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      axios.post(`/new/message?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput("");
  };
  return (
    <div style={{ alignItems: "center" }} className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button style={{ display: "none" }} type="sumbit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
