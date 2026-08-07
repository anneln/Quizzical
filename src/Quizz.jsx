import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { clsx } from "clsx";
import Confetti from "react-confetti";

/*utilisation de l'algo de Fisher Yate*/
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quizz({ onPlayAgain }) {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [btnChecked, setBtnChecked] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple",
          {
            signal: controller.signal,
          },
        );

        const result = await response.json();
        const questionAndAnswers = result.results.map((q) => ({
          ...q,
          allAnswersChoices: shuffleArray([
            ...q.incorrect_answers,
            q.correct_answer,
          ]),
        }));
        setData(questionAndAnswers);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("fetch error :", error);
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  function handleChange(e) {
    setUserAnswers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  const isAllAnswered =
    data.length > 0 && Object.keys(userAnswers).length === data.length;

  function checkAnswer(formData) {
    let points = 0;
    data.forEach((q, index) => {
      const formAnswer = formData.get(`question-${index}`);

      if (formAnswer === q.correct_answer) {
        points += 1;
      }
    });
    setScore(points);
    setBtnChecked(true);
  }

  function playAgain() {
    setData([]);
    setScore(0);
    setUserAnswers({});
    setBtnChecked(false);
    onPlayAgain();
  }

  const questionEl = data.map((q, index) => (
    <div key={index}>
      <h2>{decode(q.question)}</h2>
      <div className="form-quizz">
        {q.allAnswersChoices.map((answer, i) => {
          const isCorrect = answer === q.correct_answer;
          const isSelected = answer === userAnswers[`question-${index}`];
          return (
            <div key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={answer}
                id={`question-${index}-answer-${i}`}
                disabled={btnChecked}
              />
              <label
                className={clsx("radio-answer", {
                  right: btnChecked && isCorrect,
                  wrong: btnChecked && isSelected && !isCorrect,
                })}
                htmlFor={`question-${index}-answer-${i}`}
              >
                {decode(answer)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <div className="quizz-page">
      <form action={checkAnswer} onChange={handleChange}>
        <div className="quizz-text">{questionEl}</div>
        {!btnChecked && isAllAnswered && (
          <button
            type="submit"
            className="btn btn-submit"
            disabled={!isAllAnswered}
          >
            Check Answer
          </button>
        )}
      </form>
      {btnChecked && (
        <div className="quizz-end">
          <p className="message-score"> You scored {score}/5 correct answers</p>
          {score >= 4 && <Confetti />}
          <button className="btn btn-submit" onClick={() => playAgain()}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
