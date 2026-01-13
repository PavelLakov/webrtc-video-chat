export default function JoinRoomView({ name, setName, roomId, setRoomId, onJoin }) {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }} />
      </label>
      <label>
        Room ID
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} style={{ width: "100%" }} />
      </label>
      <button onClick={onJoin}>Join</button>
    </div>
  );
}