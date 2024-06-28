import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/theme/mode-toggle";
import { get } from "./lib/requests";
import "./app.css";

interface APIResponse {
  status: number;
}

function App() {
  const [count, setCount] = useState(0);
  const [apiStatus, SetApiStatus] = useState<number | null>(null);

  useEffect(() => {
    const handleReponse = (response: APIResponse) => {
      SetApiStatus(response.status);
    };

    get(
      "example",
      (response) => handleReponse(response as APIResponse),
      (error) => console.error(error)
    );
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex gap-6 justify-center items-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://fastapi.tiangolo.com" target="_blank">
          <img
            src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
            className="logo fastapi"
            alt="FastAPI"
          ></img>
        </a>
      </div>
      <h1 className="text-3xl">Vite + React + FastAPI</h1>
      <div className="flex gap-6 justify-start">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <ModeToggle />
      </div>
      <p className="text-foreground">Click on the logos to learn more</p>
      <p>FastAPI example response: {apiStatus}</p>
    </div>
  );
}

export default App;
