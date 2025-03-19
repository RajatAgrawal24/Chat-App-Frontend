import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const [roomId,setRoomId] = useState(786543);
    const [joinRoomId,setJoinRoomId] = useState(827394);
    const navigate = useNavigate()

    const generate = () => {
      const room = Math.floor(Math.random() * 1000000);
      setRoomId(room);
    }
    
    const createRoom = () => {
      navigate(`/chat/${roomId}`)
    }

    const joinRoom = () => {
      navigate(`/chat/${joinRoomId}`)
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96 text-white">
          {/* Create Room Section */}
          <div className="mb-4">
            <input onChange={(e) => setRoomId(parseInt(e.target.value))}
              placeholder="Enter 6-digit Room No"
              value={roomId}
              type="number"
              className="w-full mb-2 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <button onClick={createRoom} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Create Room
              </button>
              <button onClick={generate} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                Refresh
              </button>
            </div>
          </div>
  
          {/* Join Room Section */}
          <div className="mt-10">
            <input onChange={(e) => setJoinRoomId(parseInt(e.target.value))}
              value={joinRoomId}
              placeholder="Enter Room No"
              type="number"
              className="w-full mb-2 p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button onClick={joinRoom} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default JoinRoom;
  