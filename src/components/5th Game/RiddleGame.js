import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const riddles = [
  {
    riddle:
      "me visto de gala para trabajar en la calle y traer alegria a los mas chicos",
    options: ["payaso tapatin", "trava del parque", "cubanitero", "tu mama"],
    answer: 2,
  },
  {
    riddle: "soy dulce y duro, a veces un nudo, a veces no",
    options: ["esta", "alfeñique", "no sé", "caramelo"],
    answer: 1,
  },
];

const RiddleGame = () => {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [alert, setAlert] = useState(null);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (optionIndex) => {
    const showAlert = (type, message) => {
      setAlert({ type, message });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    };

    const currentRiddle = riddles[currentRiddleIndex];
    if (optionIndex === currentRiddle.answer) {
      showAlert("success", "That's right!");
      updateProgression("riddle");
      setShowCompletionScreen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      if (attempts >= 1) {
        showAlert("error", "ah, so pillo vo'");
        const nextRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
        setCurrentRiddleIndex(nextRiddleIndex);
        setAttempts(0);
      } else {
        showAlert("error", "cómo va decí eso ura");
        setAttempts(attempts + 1);
      }
    }
  };

  return (
    <div className="container p-y-8 bg-black">
      <ReturnHomeButton />
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4">vamo lo pibeeeee</h1>
        </div>
      )}
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
      <h1 className="text-5xl font-bold font-geistmono self-center">
        solve this riddle
      </h1>

      <div className="p-4 border-2 border-white w-3/4 font-bold text-center rounded self-center">
        {riddles[currentRiddleIndex].riddle}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 self-center">
        {riddles[currentRiddleIndex].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className="bg-transparent border-2 border-white text-white py-2 px-4 font-bold rounded hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RiddleGame;
