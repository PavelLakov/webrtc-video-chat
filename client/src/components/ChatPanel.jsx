import { useState } from "react";

export default function ChatPanel({ messages, onSend }) {
  const [value, setValue] = useState("");

  const send = () => {
    const msg = value.trim();
    if (!msg) return;
    onSend(msg);
    setValue("");
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ border: "1px solid #ddd", height: 220, overflow: "auto", padding: 8 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 6 }}>
            <strong>{m.from?.name || "User"}:</strong> {m.message}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1 }}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}