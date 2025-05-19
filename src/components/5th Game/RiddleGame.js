import React, { useState } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const riddles = [
  {
    riddle:
      "I'm not the first, nor second in line,\n" +
      "I'm not the third, though clues are mine.\n" +
      "My name begins where Answers start,\n" +
      "Then comes the laugh that follows K in heart.\n" +
      "A vowel next, not wide nor lean —\n" +
      "The I 👀 that spies what can't be seen.\n" +
      "And end it with a word you know,\n" +
      "The start of Always, soft and low.\n" +
      "Now read it close, no time to waste —\n" +
      "Put it together, you'll know her face.",
    answer: "alia",
  },
];

const RiddleGame = () => {
  const [currentRiddleIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [alert, setAlert] = useState(null);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentRiddle = riddles[currentRiddleIndex];
    if (userAnswer.trim().toLowerCase() === currentRiddle.answer.toLowerCase()) {
      setAlert({ type: "success", message: "That's right!" });
      updateProgression("riddle");
      setShowCompletionScreen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      if (attempts >= 1) {
        setAlert({ type: "error", message: "nopeee" });
        setAttempts(0);
      } else {
        setAlert({ type: "error", message: "are you ouf of your mind?" });
        setAttempts(attempts + 1);
      }
      setTimeout(() => setAlert(null), 2000);
    }
    setUserAnswer("");
  };

  return (
    <div className="container p-y-8 bg-black">
      <ReturnHomeButton />
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4 text-center">No shit Sherlock! 🧐</h1>
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

      <div className="p-4 border-2 border-white w-3/4 font-bold text-center rounded self-center whitespace-pre-line">
        {riddles[currentRiddleIndex].riddle}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-4">
        <input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          placeholder="Type your answer"
          className="p-2 border border-gray-300 w-3/4 bg-white text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 mb-2"
        />
        <button
          type="submit"
          className="bg-transparent border-2 border-white text-white py-2 px-4 font-bold rounded hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RiddleGame;
