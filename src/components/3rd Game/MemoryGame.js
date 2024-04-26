import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import casahistorica from '../../assets/images/dino.png';
import cheguSan from '../../assets/images/duo.png';
import gordillo from '../../assets/images/vioelta.jpeg';
import messi from '../../assets/images/jess.jpeg';
import numero1 from '../../assets/images/mate.jpeg';
import portal from '../../assets/images/chickens.jpeg';
import villeco from '../../assets/images/alfajor.jpeg';
import virgencita from '../../assets/images/two.jpeg';
import Confetti from "react-confetti";

const cardsData = [
  { id: 1, matched: false, image: casahistorica },
  { id: 2, matched: false, image: cheguSan },
  { id: 3, matched: false, image: gordillo },
  { id: 4, matched: false, image: messi },
  { id: 5, matched: false, image: numero1 },
  { id: 6, matched: false, image: portal },
  { id: 7, matched: false, image: villeco },
  { id: 8, matched: false, image: virgencita },
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
      }, 3000);
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
          <h1 className="text-5xl font-bold font-geistmono mb-4">girl are you gonna eat that scone?</h1>
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
