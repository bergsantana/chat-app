import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Messages from "../components/Messages";

const socket: Socket = io("http://localhost:3000", { autoConnect: false });

const getLocalUser = () => localStorage.getItem("user-chat");

export default function Chat() {
  const [messages, setMessages] = useState<
    { message: string; room: string; user: string }[]
  >([]);
  const [thisRoom, setThisRoom] = useState("sala teste");

  const [messageInput, setMessageInput ] = useState("")

  useEffect(() => {
    socket.on("connect", () => {
        console.log("Chegou")
      const localUser = getLocalUser();
      const thisUser = localUser;
      socket.emit("join_room", {
        room: thisRoom,
        user: socket.id,
      });
      socket.emit("chat", {
        room: thisRoom,
        user: localUser,
        message: `${localUser} entrou na sala`,
      });
    });

    socket.on("chat", (e) => {
         
          console.log("mesagens antes", messages)
          console.log('chegou mensagem', e)
          const msgAux = Array.from(messages)
          msgAux.push(e)
        setMessages((msgs ) => [e, ...msgs])
        console.log("msgs depois", messages)
        
    });

    socket.on("disconnect", () => {
      console.log("End of chat");
    });

    socket.connect();
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
    };
  }, []);

  const handleSendMessage = () => {
    const localUser = getLocalUser();
   
    socket.emit("chat", {
      room: thisRoom,
      user: localUser,
      message: messageInput,


    });

    setMessageInput("")
  }

  return(
    <>
        <div>
          <h1>CHAT</h1>
            <div className="border-2 rounded-md p-8">
              <input className="text-black p-2" placeholder="Digite aqui" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
              <button className="border-[1px] bg-blue-800 p-2 m-4" onClick={handleSendMessage}>ENVIAR</button>
            </div>
             
            <button onClick={() => console.log(messages)}> loggar msgs</button>
            {
                messages?.length  &&
                <Messages messages={messages} />
            }

          
        </div>
    </>
  ) 
  
}
