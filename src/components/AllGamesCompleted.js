const checkAllGamesCompleted = () => {
  const completedGames = JSON.parse(localStorage.getItem("completedGames") || "{}");
  // Assuming you have a list of all game names
  const allGameNames = ["trivia", "memory", "decryption", "riddle", "wordsearch"];
  return allGameNames.every(gameName => completedGames[gameName]);
};

export default checkAllGamesCompleted;
