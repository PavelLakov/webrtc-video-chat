import { useEffect, useRef } from "react";

export default function VideoTile({ label, stream, muted = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream]);

  return (
    <div style={{ border: "1px solid #ddd", padding: 8 }}>
      <div style={{ fontSize: 12, marginBottom: 6 }}>{label}</div>
      <video ref={ref} autoPlay playsInline muted={muted} style={{ width: "100%", background: "#111" }} />
    </div>
  );
}