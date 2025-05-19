import React, { useState, useEffect } from "react";
import updateProgression from "../UpdateProgression";
import ReturnHomeButton from "../ReturnHomeButton";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const words = [
  "ROCKYBEACH",
  "JUSTUS",
  "TITUS",
  "HEADQUARTERS",
  "SKELETONISLE",
  "COTTA",
  "MISTERY",
  "SKINNY",
];

const WordSearch = () => {
  const [grid, setGrid] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const navigate = useNavigate();
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  useEffect(() => {
    const initializedGrid = initializeFixedGrid();
    setGrid(initializedGrid);
  }, []);

  const handleCellClick = (rowIndex, cellIndex) => {
    setCurrentSelection((prevSelection) => {
      const selectionIndex = prevSelection.findIndex(
        (selection) =>
          selection.rowIndex === rowIndex && selection.cellIndex === cellIndex
      );

      if (selectionIndex >= 0) {
        return prevSelection.filter((_, index) => index !== selectionIndex);
      } else {
        return [...prevSelection, { rowIndex, cellIndex }];
      }
    });
  };

  const getLetterCount = (str) => {
    const count = {};
    for (const char of str) {
      count[char] = (count[char] || 0) + 1;
    }
    return count;
  };

  const validateSelection = () => {
    const selectedWord = currentSelection
      .map(({ rowIndex, cellIndex }) => grid[rowIndex][cellIndex].letter)
      .join("");

    const selectedCount = getLetterCount(selectedWord);

    // Find a word with the same letter counts
    const matchedWord = words.find((word) => {
      if (word.length !== selectedWord.length) return false;
      const wordCount = getLetterCount(word);
      return Object.keys(wordCount).every(
        (char) => wordCount[char] === selectedCount[char]
      ) && Object.keys(selectedCount).every(
        (char) => selectedCount[char] === wordCount[char]
      );
    });

    if (matchedWord && !foundWords.some((w) => w.word === matchedWord)) {
      const newFoundWord = {
        word: matchedWord,
        positions: currentSelection,
      };
      setFoundWords((prevFoundWords) => [...prevFoundWords, newFoundWord]);
    } else {
      console.log(`${selectedWord} is not valid.`);
    }

    setCurrentSelection([]);
    checkForCompletion();
  };

  const checkForCompletion = () => {
    if (foundWords.length === words.length - 1) {
      updateProgression("wordsearch");
      setShowCompletionScreen(true);
      setTimeout(() => {
        navigate("/");
      }
      , 3000);
    }
  };

  const initializeFixedGrid = () => {
    const gridTemplate = [
      ["S", "K", "E", "L", "E", "T", "O", "N", "I", "S", "L", "E"],
      ["-", "-", "-", "-", "-", "I", "-", "-", "-", "-", "-", "-"],
      ["R", "-", "-", "-", "-", "T", "-", "-", "-", "-", "-", "C"],
      ["O", "-", "-", "-", "J", "U", "S", "T", "U", "S", "-", "O"],
      ["C", "-", "-", "-", "-", "S", "-", "-", "-", "-", "-", "T"],
      ["K", "-", "-", "-", "-", "-", "K", "-", "-", "-", "-", "T"],
      ["Y", "-", "-", "-", "-", "-", "-", "I", "-", "-", "-", "A"],
      ["B", "-", "-", "-", "-", "-", "-", "-", "N", "-", "-", "-"],
      ["E", "-", "-", "-", "-", "-", "-", "-", "-", "N", "-", "-"],
      ["A", "-", "-", "-", "M", "I", "S", "T", "E", "R", "Y", "-"],
      ["C", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
      ["H", "E", "A", "D", "Q", "U", "A", "R", "T", "E", "R", "S"],
    ];

    const filledGrid = gridTemplate.map((row, rowIndex) =>
      row.map((cell, cellIndex) => ({
        letter:
          cell === "-"
            ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
            : cell,
        selected: false,
        rowIndex,
        cellIndex,
      }))
    );

    return filledGrid;
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex font-geistmono">
        {row.map((cell, cellIndex) => {
          const isSelected = currentSelection.some(
            (selection) =>
              selection.rowIndex === rowIndex &&
              selection.cellIndex === cellIndex
          );

          const isFound = foundWords.some((wordObj) =>
            wordObj.positions.some(
              (pos) => pos.rowIndex === rowIndex && pos.cellIndex === cellIndex
            )
          );

          return (
            <div
              key={cellIndex}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
              className={`w-8 h-8 flex items-center justify-center cursor-pointer hover:border hover:border-white ${
                isSelected
                  ? "text-red-500"
                  : isFound
                  ? "text-blue-500"
                  : "bg-transparent"
              }`}
            >
              {cell.letter}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="container p-6 items-center">
      <ReturnHomeButton />
      {showCompletionScreen && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Confetti width={window.width} height={window.height} />
          <h1 className="text-5xl font-bold font-geistmono mb-4 text-center">Did you also search for words in the red tower? 🗼</h1>
        </div>
      )}
      <h1 className="text-5xl font-bold font-geistmono mb-4">find the words</h1>
      <div className="flex flex-col items-center mb-4">
        <div className="border-2 p-2 rounded">{renderGrid()}</div>
        <button
          onClick={validateSelection}
          className="mt-4 px-4 py-2 bg-transparent border-2 text-white font-semibold rounded hover:bg-white hover:text-black transition-colors"
        >
          check word
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {words.map((word) => {
          const isFound = foundWords.some((wordObj) => wordObj.word === word);
          return (
            <span
              key={word}
              className={`px-3 py-1 bg-transparent text-sm ${
                isFound ? "line-through text-blue-900" : ""
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WordSearch;
