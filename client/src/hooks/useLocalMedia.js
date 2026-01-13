import { useRef, useState } from "react";

export function useLocalMedia() {
  const localStreamRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);

  const start = async () => {
    if (localStreamRef.current) return localStreamRef.current;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    setLocalStream(stream); // ✅ triggers re-render
    return stream;
  };

  const toggleAudio = () => {
    const s = localStreamRef.current;
    if (!s) return;
    s.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
  };

  const toggleVideo = () => {
    const s = localStreamRef.current;
    if (!s) return;
    s.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
  };

  return { localStreamRef, localStream, start, toggleAudio, toggleVideo };
}