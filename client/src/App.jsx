import "./styles/app.css";
import JoinRoomView from "./components/JoinRoomView";
import VideoGrid from "./components/VideoGrid";
import ChatPanel from "./components/ChatPanel";
import ControlsBar from "./components/ControlsBar";
import { useLocalMedia } from "./hooks/useLocalMedia";
import { useRoom } from "./hooks/useRoom";
import { useChat } from "./hooks/useChat";

export default function App() {
  const { localStreamRef, localStream, start, toggleAudio, toggleVideo } = useLocalMedia();
  const room = useRoom({ localStreamRef });
  const chat = useChat({ roomId: room.roomId });

  const join = async () => {
    await start();
    room.join();
  };

  return (
    <div className="page">
      <h2>WebRTC Video Chat</h2>

      {!room.joined ? (
        <JoinRoomView
          name={room.name}
          setName={room.setName}
          roomId={room.roomId}
          setRoomId={room.setRoomId}
          onJoin={join}
        />
      ) : (
        <>
          <VideoGrid localStream={localStream} remotes={room.remotes} />
          <ControlsBar onToggleAudio={toggleAudio} onToggleVideo={toggleVideo} />
          <div style={{ marginTop: 16 }}>
            <ChatPanel messages={chat.messages} onSend={chat.send} />
          </div>
        </>
      )}
    </div>
  );
}