import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const questions = [
  {
    question: "a qué ciudad se conoce como la perla del sur?",
    answers: [
      { text: "concepción", isCorrect: true },
      { text: "famailla", isCorrect: false },
      { text: "monteros", isCorrect: false },
      { text: "aguilares", isCorrect: false },
    ],
  },
  {
    question: "que heladeria tiene el mejor helado de limon?",
    answers: [
      { text: "tello", isCorrect: false },
      { text: "blue bell", isCorrect: true },
      { text: "grido", isCorrect: false },
      { text: "luchianos", isCorrect: false },
    ],
  },
  {
    question: "cual es la palabra que más usos tiene?",
    answers: [
      { text: "cageta", isCorrect: false },
      { text: "ura", isCorrect: false },
      { text: "aca", isCorrect: true },
      { text: "chango", isCorrect: false },
    ],
  },
  {
    question: "el santo y el deca...",
    answers: [
      { text: "son tremendos", isCorrect: false },
      { text: "siempre pierden", isCorrect: false },
      { text: "siempre ganan", isCorrect: true },
      { text: "y esos?", isCorrect: false },
    ],
  },
  // Add more questions here
];

const TriviaGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [alert, setAlert] = useState(null);
  const totalQuestions = questions.length;
  const navigate = useNavigate();
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setAlert({ type: "success", message: "bien ahí nerd" });
    } else {
      setAlert({ type: "error", message: "cómo va decí eso atao?" });
    }

    setTimeout(() => {
      setAlert(null);
      if (isCorrect) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < totalQuestions) {
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          setShowScore(true);
          if (score + 1 === totalQuestions) {
            updateProgression("trivia");
            setShowCompletionScreen(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        }
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setScore(0);

    const completedGames = JSON.parse(
      localStorage.getItem("completedGames") || "{}"
    );
    completedGames["trivia"] = false;
    localStorage.setItem("completedGames", JSON.stringify(completedGames));
  };

  return (
    <div className="container">
      <ReturnHomeButton />
      {alert && (
        <div
          className={`fixed top-10 px-4 py-2 rounded self-center font-bold ${
            alert.type === "success"
              ? "bg-transparent border-2 border-green-500 text-green-500"
              : "bg-transparent border-2 border-red-500 text-red-500"
          }`}
        >
          {alert.message}
        </div>
      )}
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4">vamo el deca</h1>
        </div>
      )}
      {showScore ? (
        <div className="container text-center">
          <div className="text-2xl font-semibold pb-4">
            Score: {score} out of {questions.length}
          </div>
          <div className="text-lg">
            <button
              onClick={restartGame}
              className="ml-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Restart Game
            </button>
          </div>
          {/* Optionally, add a button to restart the game */}
        </div>
      ) : (
        <div className="mini-container space-y-16">
          <div className="text-2xl font-bold text-center font-geistmono">
            question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-3xl font-bold font-geistmono text-center">
            {questions[currentQuestionIndex].question}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerButtonClick(answer.isCorrect)}
                className={`bg-transparent border-2 text-white p-4 rounded hover:bg-white hover:text-black transition duration-300 text-xl font-geist`}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
