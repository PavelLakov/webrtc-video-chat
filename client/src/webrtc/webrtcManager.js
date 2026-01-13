import { ICE_SERVERS } from "./iceServers";

export function createWebrtcManager({ socket, localStreamRef, onRemoteUpdate }) {
  const peers = new Map(); // peerId -> { pc, remoteStream, name }

  const ensurePeer = (peerId, peerName = "User") => {
    if (peers.has(peerId)) return peers.get(peerId);

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit("webrtc:ice-candidate", { to: peerId, candidate: e.candidate });
    };

    pc.ontrack = (e) => {
      const obj = peers.get(peerId);
      if (!obj) return;
      obj.remoteStream = e.streams[0];
      onRemoteUpdate(listPeers());
    };

    const localStream = localStreamRef.current;
    if (localStream) localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

    const obj = { pc, remoteStream: null, name: peerName };
    peers.set(peerId, obj);
    onRemoteUpdate(listPeers());
    return obj;
  };

  const callPeer = async (peerId, peerName) => {
    const { pc } = ensurePeer(peerId, peerName);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("webrtc:offer", { to: peerId, sdp: offer });
  };

  const handleOffer = async ({ from, sdp, name }) => {
    const { pc } = ensurePeer(from, name);
    await pc.setRemoteDescription(sdp);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("webrtc:answer", { to: from, sdp: answer });
  };

  const handleAnswer = async ({ from, sdp }) => {
    const obj = peers.get(from);
    if (!obj) return;
    await obj.pc.setRemoteDescription(sdp);
  };

  const handleIceCandidate = async ({ from, candidate }) => {
    const obj = peers.get(from);
    if (!obj) return;
    try { await obj.pc.addIceCandidate(candidate); } catch {}
  };

  const removePeer = (peerId) => {
    const obj = peers.get(peerId);
    if (obj?.pc) obj.pc.close();
    peers.delete(peerId);
    onRemoteUpdate(listPeers());
  };

  const listPeers = () =>
    Array.from(peers.entries()).map(([peerId, obj]) => ({
      peerId,
      name: obj.name,
      stream: obj.remoteStream,
    }));

  return { ensurePeer, callPeer, handleOffer, handleAnswer, handleIceCandidate, removePeer, listPeers };
}