import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ChatAPiService } from "../modules/chat.api.service";
import Chat from "../views/Chat";

export default function ContactsModal({
  isOpen,
  handleOpen,
  contacts,
  setContacts,
  owner
}: {
  owner: string
  isOpen: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  contacts: string[];
  setContacts: Dispatch<SetStateAction<string[]>>;
}) {
  const [addContact, setAddContact] = useState("");

  const handleAddContact = async () => {
    const aux = Array.from(contacts);
    const repeated = aux.find((contact) => contact === addContact);
    if (!repeated) aux.push(addContact);

   const req = await ChatAPiService.createContact({
      ownerEmail: owner,
      contactEmail: addContact
    })

  const reqChat = await ChatAPiService.createChat([owner, addContact])
    if(req.data){
      console.log('mais um', req.data)
    }
    setContacts(aux);

    setAddContact("");

    localStorage.setItem("user-contacts", "")
    localStorage.setItem("chat-rooms", "")
  };
 
  return (
    <>
      <Modal open={isOpen} onClose={handleOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            color: "black",
            width: 300,
          }}
        >
          <div className="flex border-[1px] justify-end font-extrabold">
            <Button onClick={() => handleOpen(false)}>X</Button>
          </div>
          <div className="flex flex-col w-full border-4 border-blue-400 items-center">
            <input
              className="w-[80%] border-b-gray-700 border-2 rounded-lg p-2"
              placeholder="Digite um email para adicionar "
              value={addContact}
              onChange={(e) => setAddContact(e.target.value)}
            />
            <button
              onClick={handleAddContact}
              className="border-4 m-2 p-2 w-48 border-blue-400   rounded hover:bg-blue-400   hover:text-white"
            >
              Adicionar contato
            </button>
          </div>

          {contacts.length &&
            contacts.map((contactItem) => (
              <div className="p-4 border-2 border-gray-100">
                <p>{contactItem}</p>
              </div>
            ))}
        </Box>
      </Modal>
    </>
  );
}
