import { useEffect, useRef, useState } from "react"

function App() {
  const [messages, setMessages] = useState(["Hi there" , "Hello"])
  const wsRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    const ws = new WebSocket("https://chatapp-2ki3.onrender.com/");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    //@ts-expect-error err
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    //Cleanup
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="h-screen bg-black ">
      <br /><br /><br />
      <div className="h-[85vh]">
        {messages.map(message => 
          <div className="m-10">
            <span className="bg-white text-black p-4 rounded">{message}</span>
          </div>
        )}
      </div>
      <div className="w-full bg-white flex">
        {/* @ts-expect-error err */}
        <input ref={inputRef} className="flex-1 p-4" id="message"/>
        <button className="bg-purple-600 text-white p-4" onClick={() => {
          //@ts-expect-error msg
          const msg = inputRef.current?.value;
          // const msg = document.getElementById("message")?.value;
          {/* @ts-expect-error err */}
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: msg
            }
          }))
        }}>
          Send Message
        </button>
      </div>
    </div>
  )
}

export default App
