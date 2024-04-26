import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const riddles = [
  {
    riddle:
      "In a world of beginnings, I stand by, guiding new stars to the sky. Neither mother nor nurse by trade, yet in birth's magic, my hands are laid. I whisper wisdom, calm, and light, Through the darkest hours of the night. In life's first cry, my joy is found, Yet my name's not uttered, a silent sound.",
    options: ["doctor", "doula", "midwife", "what did you smoke pato?"],
    answer: 2,
  },
  {
    riddle: "i thought you woul've guessed the first one so I didn't prepare anything for this one",
    options: ["colt .45", "two zig zags", "baby", "that's all I need"],
    answer: 0,
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
        showAlert("error", "nopeee");
        const nextRiddleIndex = (currentRiddleIndex + 1) % riddles.length;
        setCurrentRiddleIndex(nextRiddleIndex);
        setAttempts(0);
      } else {
        showAlert("error", "are you ouf of your mind?");
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
          <h1 className="text-5xl font-bold font-geistmono mb-4">no shit sherlock</h1>
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
