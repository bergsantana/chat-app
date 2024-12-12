import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ContactsModal from "./components/ContactsModal";
import { ChatAPiService } from "./modules/chat.api.service";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [rooms, setRooms] = useState<{ parcipantsEmails: string[] }[]>([]);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [contacts, setContats] = useState<string[]>([]);

  const navigate = useNavigate();

  const openLogout = () => {
    localStorage.setItem("user-chat", "");
    localStorage.setItem("chat-rooms", "");
    localStorage.setItem("user-contacts", "");


    navigate("login");
  };

  const handleContactsModal = () => setIsContactsOpen(true);

  const getUserData = async () => {
    const localUser = localStorage.getItem("user-chat");
    if (localUser) {
      const localRooms = localStorage.getItem("chat-rooms");
      const localContacts = localStorage.getItem("user-contacts");
      if (!localRooms || !localContacts) {
        const allContacts = await ChatAPiService.getContacts(localUser);

        const contactsData = allContacts.data.map(
          (contact: any) => contact.contactEmail
        );

        setContats(contactsData);
        localStorage.setItem("user-contacts", JSON.stringify(contacts));
        const allChats = await ChatAPiService.getAllChat(localUser);
        console.log("contactsData", contactsData);
        if (allChats.data) {
          const listOfChats = allChats.data as { parcipantsEmails: string[] }[];
          console.log("LISTA DE CHATS", listOfChats);

          setRooms(listOfChats);
          localStorage.setItem("chat-rooms", JSON.stringify(rooms));
        }
      }
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user-chat");
    const localContacts = localStorage.getItem("user-contacts")
    const localChats = localStorage.getItem("chat-rooms")
    console.log("checando", localChats, localContacts)
    if(localContacts && localChats) {
      setContats(JSON.parse(localContacts))
      setRooms(JSON.parse(localChats))
    }
    if (localUser) setUser(localUser);
    if (!localUser) navigate("login");
  }, []);

  useEffect(() => {
    getUserData();
  });
  return (
    <>
      <ContactsModal
      owner={user}
        contacts={contacts}
        setContacts={setContats}
        isOpen={isContactsOpen}
        handleOpen={setIsContactsOpen}
         
      />
      <div>
        <div>
          <h1>Bem vindo, {user.split("@")[0]}</h1>
          <Sidebar
            rooms={rooms}
            handleLogout={openLogout}
            handleContacts={handleContactsModal}
          />
        </div>

        <div className="flex border-2 w-[50vw] justify-center flex-col items-center align-middle">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;

