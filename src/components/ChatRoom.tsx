import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading";

interface Message {
  text: string;
  userId: string;
  username?: string;
}

function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([{text:"Hi there", userId:"001", username: "Admin"}]);
  const [userCount, setUserCount] = useState(1);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const wsRef = useRef<WebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { roomId, username } = useParams()

  // To scroll down to Latest msg
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:8080");
    const ws = new WebSocket("wss://chatapp-2ki3.onrender.com");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat") {
        setMessages(m => [...m, {text:data.message, userId:data.userId, username:data.username}]);
        // console.log("Chat message:", data.message);
      } else if (data.type === "roomCount") {
        setUserCount(data.count);
        // console.log("Users in room:", data.count);
      } else if (data.type === "userId") {
        setUserId(data.userId); // Store assigned userId
      }
    }

    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId,
          username: username,
        }
      }))
      
      setLoading(false)
    }

    //Cleanup
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [roomId, username])

  const sendMessage = () => {
    const msg = inputRef.current?.value;
    if (!msg ) return; // Prevent sending empty messages

    // const msg = document.getElementById("message")?.value;
    wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload: {
        text: msg,
        userId: userId,
        username: username
      }
    }))

    setMessages(m => [...m, { text: msg, userId, username }]); // Add message locally to prevent delay
    
    if(inputRef.current) inputRef.current.value = ""; // Clear input after sending
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  

  return (
    loading ? <Loading/> :
    (
      <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Chat Card */}
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-3">
          <h2 className="text-lg font-bold text-white">Chat Room: {roomId}</h2>
          <h2 className="text-lg text-white">{username}</h2>
          <span className="text-sm text-gray-400">Users Online: {userCount}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 h-80">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.userId === userId ? "items-end" : "items-start"} mb-2`}>
              {msg.userId !== userId && (
                <span className="text-xs text-gray-300 bg-gray-800 p-1 rounded-md mb-1">
                  {msg.username}
                </span>
              )}
              <span className={`px-4 py-2 rounded-lg max-w-xs text-white ${msg.userId === userId ? "bg-green-500" : "bg-blue-500"}`}>
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>


        {/* Input Field */}
        <div className="border-t border-gray-700 pt-3 flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-700 text-white rounded-l-lg outline-none"
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}
            className="bg-purple-600 text-white px-4 py-3 rounded-r-lg hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    )
  )
}

export default ChatRoom