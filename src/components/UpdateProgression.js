const updateProgression = (gameName) => {
  const completedGames = JSON.parse(
    localStorage.getItem("completedGames") || "{}"
  );
  completedGames[gameName] = true;
  localStorage.setItem("completedGames", JSON.stringify(completedGames));
};

export default updateProgression;
