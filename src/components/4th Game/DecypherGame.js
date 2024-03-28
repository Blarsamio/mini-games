import React, { useState } from 'react';
import updateProgression from '../UpdateProgression';
import ReturnHomeButton from '../ReturnHomeButton';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const DecipherGame = () => {
  const [guess, setGuess] = useState('');
  const [message] = useState('hk xud qr vhdv dvl');
  const navigate = useNavigate();
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const checkGuess = () => {
    const decodedMessage = caesarCipherDecrypt(message, 3);
    if (guess.toLowerCase() === decodedMessage.toLowerCase()) {
      updateProgression('decryption');
      setShowCompletionScreen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      alert('Incorrect guess. Try again!');
    }
  };

  const caesarCipherDecrypt = (str, shift) => {
    return str.replace(/[a-z]/gi, (char) => {
      const offset = char === char.toLowerCase() ? 97 : 65;
      let charCode = char.charCodeAt(0) - offset;
      charCode = (charCode - shift + 26) % 26;
      return String.fromCharCode(charCode + offset);
    });
  };

  return (
    <div className="container items-center">
      <ReturnHomeButton />
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4">no te dicen cerebrito por nada a vo</h1>
        </div>
      )}
      <h1 className="text-4xl font-bold font-geistmono">decypher the message</h1>

      <div className="p-8 border-2 text-white border-white w-3/4 text-center rounded bg-zinc-900 text-xl font-bold">
        {message}
      </div>

      <input
        type="text"
        value={guess}
        onChange={handleGuessChange}
        placeholder="hint: shift by 3"
        className="p-2 border border-gray-300 w-3/4 bg-white text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
      />

      <button
        onClick={checkGuess}
        className="bg-transparent border-2 border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black font-bold"
      >
        check attempt
      </button>
    </div>
  );
};

export default DecipherGame;
