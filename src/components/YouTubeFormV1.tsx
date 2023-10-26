// without using react hook form
import { useState } from "react";

const YouTubeFormV1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");

  const onSubmit = () => {
    console.log("formData: ", {
      username,
      email,
      channel,
    });
  };

  return (
    <div>
      <label className="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        name="channel"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
      />

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default YouTubeFormV1;
