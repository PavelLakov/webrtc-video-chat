export default function ControlsBar({ onToggleAudio, onToggleVideo }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <button onClick={onToggleAudio}>Toggle Mic</button>
      <button onClick={onToggleVideo}>Toggle Camera</button>
    </div>
  );
}