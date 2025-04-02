import { Route, Routes } from "react-router-dom"
import JoinRoom from "./components/JoinRoom"
import ChatRoom from "./components/ChatRoom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom/>}/>
      <Route path="/chat/:roomId/:username" element={<ChatRoom />} />
    </Routes>
  )
}

export default App
