import { useState } from "react";
import Quizz from "./Quizz";

export default function App() {
  const [start, setStart] = useState(false);
  const [quizzKey, setQuizzKey] = useState(0);

  function startQuizz() {
    setStart(true);
  }

  function resetQuizz() {
    setQuizzKey((prev) => prev + 1);
  }

  return (
    <main>
      <div className="shape yellow-sh"></div>
      <div className="shape blue-sh"></div>

      {start ? (
        <Quizz key={quizzKey} onPlayAgain={resetQuizz} />
      ) : (
        <div className="intro-page">
          <h1>Quizzical</h1>
          <p>Test your knowledge 🎓 !</p>
          <button className="start-btn btn" onClick={startQuizz}>
            Start quiz
          </button>
        </div>
      )}
    </main>
  );
}
