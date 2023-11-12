import "./css/App.css";
import Header from "./Components/Header";
import SlotMachine from "./Components/SlotMachine.jsx";
import GameHistory from "./Components/GameHistory.jsx";
import { useState, useEffect } from "react";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {windowWidth < 600 ? (
        <div className="mobileNotSupports">
          <Header></Header>
          <p>
            For the best user experience, please access the application via a
            PC.
          </p>
          <p>
            For the best user experience, please access the application via a
            PC.
          </p>
          <p>
            For the best user experience, please access the application via a
            PC.
          </p>
        </div>
      ) : (
        <div className="App">
          <Header></Header>
          <SlotMachine></SlotMachine>
          <GameHistory></GameHistory>
        </div>
      )}
    </div>
  );
}

export default App;
