export default function Messages({
  messages,
}: {
  messages: { message: string; user: string }[];
}) {
  return (
    <>
      {messages &&  messages.map((message) => (
        <div className="border-2 rounded-md bg-gray-500 text-start">
          <p>{message.user} diz: {message.message}</p>
        </div>
      ))}
    </>
  );
}
