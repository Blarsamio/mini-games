const updateProgression = (gameName) => {
  const completedGames = JSON.parse(
    localStorage.getItem("completedGames") || "{}"
  );
  completedGames[gameName] = true;
  localStorage.setItem("completedGames", JSON.stringify(completedGames));
  // Optionally, update the progress bar here or on the HomePage component based on completed games
};

export default updateProgression;
