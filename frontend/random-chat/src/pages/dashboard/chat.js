import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "@/styles/chat.module.css";
const chat = () => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    let ws = new WebSocket(
      `ws://localhost:8000/${router.query.sender}/${router.query.reciver}`
    );
    setSocket(ws);
    ws.addEventListener("message", (e) => {
      console.log(JSON.parse(e.data));
      setChatData([...chatData, JSON.parse(e.data)]);
    });
    ws.addEventListener("open", (e) => {
      console.log("open");
    });
    ws.addEventListener("error", (e) => {
      console.log("error");
    });
    return () => {
      ws.close();
    };
  }, [chatData]);

  const sendMsg = () => {
    let data = JSON.stringify({
      sender: router.query.sender,
      reciver: router.query.reciver,
      msg: msg,
    });
    socket.send(data);
    setMsg("");
  };

  return (
    <div className={styles.body}>
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMsg}>send</button>

      <div className={styles.chatbox}>
        {chatData.map((item, idx) => (
          <>
            {item.sender === router.query.sender ? (
              <div className={styles.sender} key={idx}>
                <p>{item.msg}</p>
              </div>
            ) : (
              <div className={styles.reciver} key={idx}>
                <p>{item.msg}</p>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default chat;
