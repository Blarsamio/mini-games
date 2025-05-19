import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import professor from '../../assets/images/prof.png';
import skinny from '../../assets/images/skinny.png';
import police from '../../assets/images/police.png';
import peter from '../../assets/images/peter.png';
import mathilde from '../../assets/images/mathulde.png';
import bob from '../../assets/images/bob.png';
import justus from '../../assets/images/justus.png';
import titus from '../../assets/images/titus.png';
import Confetti from "react-confetti";

const cardsData = [
  { id: 1, matched: false, image: professor },
  { id: 2, matched: false, image: skinny },
  { id: 3, matched: false, image: police },
  { id: 4, matched: false, image: peter },
  { id: 5, matched: false, image: mathilde },
  { id: 6, matched: false, image: bob },
  { id: 7, matched: false, image: justus },
  { id: 8, matched: false, image: titus },
];

const MemoryGame = () => {
  const [shuffledCards, setShuffledCards] = useState([]);
  const navigate = useNavigate();
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  useEffect(() => {
    const shuffled = [...cardsData, ...cardsData].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, []);

  const [flippedCards, setFlippedCards] = useState([]);
  const [matched, setMatched] = useState([]);

  const checkForCompletion = () => {
    if (matched.length === cardsData.length - 1) {

      updateProgression('memory');
      setShowCompletionScreen(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  };

  const handleCardClick = (card, index) => {
    if (flippedCards.length < 2) {
      setFlippedCards([...flippedCards, index]);
    }

    if (flippedCards.length === 1) {
      const firstCard = shuffledCards[flippedCards[0]];
      const secondCard = card;

      if (secondCard.id === firstCard.id) {
        setMatched([...matched, firstCard.id]);
        setFlippedCards([]);
        checkForCompletion();
        console.log(matched.length);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="container items-center">
      <ReturnHomeButton />
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4 text-center">I'm truly surprised your memory let you pass this one!</h1>
        </div>
      )}
      <h1 className="text-center text-5xl font-bold font-geistmono mb-8">memory game</h1>
      <div className="grid grid-cols-4 gap-4">
        {shuffledCards.map((card, index) => (
          <div
            key={index}
            className={`w-24 h-24 bg-white flex justify-center items-center font-bold text-xl rounded transform transition duration-500 hover:scale-110 hover:cursor-pointer ${
              flippedCards.includes(index) ? "bg-red-500" : "bg-blue-500"
            }`}
            onClick={() => handleCardClick(card, index)}
          >
            {flippedCards.includes(index) || matched.includes(card.id) ? (
              <img src={card.image} alt="card" className="w-20 h-20 object-contain" />
            ) : (
              <span className="text-black"></span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-xl font-bold">
        <p>find the pairs</p>
      </div>
    </div>
  );
};

export default MemoryGame;
