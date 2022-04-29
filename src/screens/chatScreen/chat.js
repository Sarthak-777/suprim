import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatHeads from "../../components/chatheads/chatHeads";
import Conversation from "../../components/conversation/conversation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import "./chat.css";

export default function ChatScreen({ setUser, user }) {
  let navigate = useNavigate();

  const [chatHeads, setChatHeads] = useState([]);
  const [receiver, setReceiver] = useState(null);

  React.useEffect(() => {
    // get from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    // if no user -> redirect
   
  }, [navigate, setUser]);

  React.useEffect(() => {
    if (!user) return;

    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setChatHeads(
        querySnapshot.docs
          .map((doc) => doc.data())
          .filter((obj) => obj.uid !== user.uid)
      );
    })();
  }, [user]);

  return (
    <div className="chat-screen">
      {/* ChatHeads */}
      <div className="half-screen chat-heads">
        <ChatHeads items={chatHeads} setReceiver={setReceiver} />
      </div>

      {/* Conversation */}
      <div className="half-screen">
        <Conversation receiver={receiver} user={user} />
      </div>
    </div>
  );
}
