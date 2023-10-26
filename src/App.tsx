import { useState } from "react";
import "./App.css";

import YouTubeForm from "./components/YouTubeForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <YouTubeForm />
    </div>
  );
}

export default App;
