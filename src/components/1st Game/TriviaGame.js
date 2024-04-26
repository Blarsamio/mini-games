import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const questions = [
  {
    question: "what's the book i never read?",
    answers: [
      { text: "violeta", isCorrect: true },
      { text: "siddharta", isCorrect: false },
      { text: "the bible", isCorrect: false },
      { text: "i've read everything", isCorrect: false },
    ],
  },
  {
    question: "what's my actual last name?",
    answers: [
      { text: "perez herrera", isCorrect: false },
      { text: "perez herrero", isCorrect: true },
      { text: "peres herrero", isCorrect: false },
      { text: "prz hrrro", isCorrect: false },
    ],
  },
  {
    question: "what's the word that goes well with 'cogeme...'",
    answers: [
      { text: "suave", isCorrect: false },
      { text: "duro", isCorrect: false },
      { text: "all the options", isCorrect: true },
      { text: "fuerte", isCorrect: false },
    ],
  },
  {
    question: "is that a mockingbird?",
    answers: [
      { text: "yes it is", isCorrect: false },
      { text: "nope", isCorrect: false },
      { text: "is that a mockingbird?", isCorrect: true },
      { text: "i think it's a blackbird", isCorrect: false },
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
      setAlert({ type: "success", message: "look at you nerd" });
    } else {
      setAlert({ type: "error", message: "bitch, what?" });
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
          <h1 className="text-5xl font-bold font-geistmono mb-4">
            can't believe you got my last name right
          </h1>
        </div>
      )}
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
    </div>
  );
};

export default TriviaGame;
