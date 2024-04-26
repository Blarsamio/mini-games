import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checkAllGamesCompleted from "../components/AllGamesCompleted";
import rickVideo from "../assets/videos/videoplayback.mp4";
import {
  faBrain,
  faPuzzlePiece,
  faLockOpen,
  faSearch,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const games = [
    { path: "/decryption", icon: faLockOpen, label: "decryption" },
    { path: "/trivia", icon: faBrain, label: "trivia" },
    { path: "/memory", icon: faPuzzlePiece, label: "memory" },
    { path: "/wordsearch", icon: faSearch, label: "wordsearch" },
    { path: "/riddle", icon: faQuestion, label: "riddle" },
  ];

  const [completedGames, setCompletedGames] = useState({});
  const allGamesCompleted = checkAllGamesCompleted();

  useEffect(() => {
    setCompletedGames(JSON.parse(localStorage.getItem("completedGames")) || {});
  }, []);

  const calculateProgress = () => {
    const completedCount = Object.values(completedGames).filter(
      (isCompleted) => isCompleted
    ).length;
    return (completedCount / 5) * 100;
  };

  const resetProgress = () => {
    localStorage.removeItem("completedGames");
    setCompletedGames({});
  };

  return (
    <div className="container items-center h-screen bg-black">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold font-geistmono">welcome</h1>
        <h2 className="text-2xl font-bold">choose a game to play</h2>
      </div>
      {allGamesCompleted && (
        <div className="w-full flex justify-center my-8">
          <video
            src={rickVideo}
            autoPlay
            controls
            className="w-[50%] h-auto"
          ></video>
        </div>
      )}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {games.map((game) => (
          <Link
            to={game.path}
            key={game.label}
            className={`w-30 rounded-lg flex justify-center items-center shadow-md text-black font-bold hover:scale-110 transition duration-300 p-5 ${
              completedGames[game.label]
                ? "bg-white text-black"
                : "bg-transparent border-2 border-white text-white"
            }`}
          >
            <FontAwesomeIcon icon={game.icon} size="2x" />
          </Link>
        ))}
      </div>
      <ProgressBar progress={calculateProgress()} />
      {allGamesCompleted && (
        <button
          onClick={resetProgress}
          className="bg-transparent text-red-500 border-2 border-red-500 font-bold mt-2 py-2 px-4 rounded w-[25%] self-center transition duration-300"
        >
          Reset Progress
        </button>
      )}
    </div>
  );
};

export default HomePage;
