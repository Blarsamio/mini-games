import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const questions = [
  {
    question: "What is Justus Jonas' nickname among the three detectives?",
    answers: [
      { text: "Chef", isCorrect: true },
      { text: "Der Flüsterer", isCorrect: false },
      { text: "Bossman", isCorrect: false },
      { text: "Professor", isCorrect: false },
    ],
  },
  {
    question: "Which character is a scientist and often helps the boys with technical problems?",
    answers: [
      { text: "Dr. Franklin", isCorrect: false },
      { text: "Professor Augustus", isCorrect: true },
      { text: "Professor Shy", isCorrect: false },
      { text: "Herr Marvin", isCorrect: false },
    ],
  },
  {
    question: "What is the secret entrance to Die Drei ??? headquarters?",
    answers: [
      { text: "Eine verschiebbare Wandplatte im Haus", isCorrect: false },
      { text: "Durch einen Kleiderschrank", isCorrect: false },
      { text: "Durch einen Tunnel unter einem Schrotthaufen", isCorrect: true },
      { text: "Durch eine Falltür in einem Schuppen", isCorrect: false },
    ],
  },
  {
    question: "Which episode is known for being unusually scary and even caused complaints from parents?",
    answers: [
      { text: "Der Fluch des Drachen", isCorrect: false },
      { text: "Der lachende Schatten", isCorrect: false },
      { text: "Der Grusel auf Campbell Castle", isCorrect: true },
      { text: "Die flüsternde Mumie", isCorrect: false },
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
            }, 5000);
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
              ? "bg-green-500 border-2 border-white text-white font-bold"
              : "bg-red-500 border-2 border-white text-white"
          }`}
        >
          {alert.message}
        </div>
      )}
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4 text-center">
            You are a creep, you are a weirdo... still you passed this test!
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
