import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const [username, setUsername] = useState("Ghost");
    const [joinRoomId, setJoinRoomId] = useState(827394);
    const navigate = useNavigate();

    const generate = () => {
        const room = Math.floor(Math.random() * 1000000);
        setJoinRoomId(room);
    };

    const joinRoom = () => {
        if (!username.trim()) {
            alert("Please enter a username.");
            return;
        }
        navigate(`/chat/${joinRoomId}/${username}`);
    };

    const login = () => {
        window.open("http://localhost:3000/auth/google");
    };

    return (
        <>
            {/* Header Section */}
            <header className="flex items-center justify-end p-5 bg-slate-950 text-white shadow-md">
                <button 
                    onClick={login} 
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl shadow-lg transition duration-300"
                >
                    Login With Google
                </button>
            </header>

            {/* Main Container */}
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="bg-gray-900 p-8 rounded-3xl shadow-xl w-96 text-white border border-gray-700">
                    
                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-center mb-6">Join a Chat Room</h2>

                    {/* Username Input */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-400">Enter Username</label>
                        <input 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Type your name"
                            value={username}
                            type="text"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    {/* Room ID Input */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-400">Enter Room ID</label>
                        <div className="flex gap-3">
                            <input 
                                onChange={(e) => setJoinRoomId(parseInt(e.target.value))}
                                value={joinRoomId}
                                placeholder="Enter Room No"
                                name="roomId"
                                type="number"
                                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                            <button 
                                onClick={generate} 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md transition duration-300"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Join Room Button */}
                    <button 
                        onClick={joinRoom} 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-lg"
                    >
                        Join Room
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by{" "} 
            <a href="https://github.com/RajatAgrawal24" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
            Rajat
            </a>
            </div>
            
        </>
    );
}

export default JoinRoom;
