import { useState } from "react";
import Quizz from "./Quizz";

export default function App() {
  const [start, setStart] = useState(false);

  const [difficulty, setDifficulty] = useState("medium");

  function startQuizz(level) {
    setDifficulty(level);
    setStart(true);
    console.log(level);
  }

  function resetQuizz() {
    setStart(false);
  }

  return (
    <main>
      <div className="shape yellow-sh"></div>
      <div className="shape blue-sh"></div>

      {start ? (
        <Quizz difficulty={difficulty} onPlayAgain={resetQuizz} />
      ) : (
        <div className="intro-page">
          <h1>Quizzical 🎯</h1>
          <p>Test your knowledge !</p>
          <p>Choose difficulty for starting quizz</p>
          <div className="level">
            <button
              className="btn-level btn-easy"
              onClick={() => startQuizz("easy")}
            >
              Easy
            </button>
            <button className="btn-level" onClick={() => startQuizz("medium")}>
              Medium
            </button>
            <button
              className="btn-level btn-hard"
              onClick={() => startQuizz("hard")}
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
