import VideoTile from "./VideoTile";

export default function VideoGrid({ localStream, remotes }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div>
        <h3>Local</h3>
        <VideoTile label="You" stream={localStream} muted />
      </div>
      <div>
        <h3>Remote</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {remotes.map((r) => (
            <VideoTile key={r.peerId} label={r.name} stream={r.stream} />
          ))}
        </div>
      </div>
    </div>
  );
}