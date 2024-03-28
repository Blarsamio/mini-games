import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TriviaGame from './components/1st Game/TriviaGame';
import WordSearch from './components/2nd Game/WordSearch';
import MemoryGame from './components/3rd Game/MemoryGame';
import DecipherGame from './components/4th Game/DecypherGame';
import RiddleGame from './components/5th Game/RiddleGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trivia" element={<TriviaGame />} />
        <Route path="/wordsearch" element={<WordSearch />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/decryption" element={<DecipherGame />} />
        <Route path="/riddle" element={<RiddleGame />} />
      </Routes>
    </Router>
  );
}

export default App;
