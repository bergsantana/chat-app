export default function Sidebar({
  rooms,
  handleLogout,
  handleContacts
}: {
  rooms: { parcipantsEmails: string[]}[];
  handleLogout: () => void;
  handleContacts: () => void;
}) {
  return (
    <>
      <div>
        <button onClick={handleLogout}>LOGOUT</button>
        <button onClick={handleContacts}>Contatos</button>
      </div>
      <div className="flex gap-2">
        { rooms.length && rooms.map(room => (
          <button className="flex flex-col w-40 border-2 rounded-md"  >
           Chat com {room.parcipantsEmails.length} participantes
          </button>
        ))}
      </div>
    </>
  );
}
