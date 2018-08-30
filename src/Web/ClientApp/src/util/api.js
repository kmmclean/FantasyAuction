async function getPlayers() {
  const response = await fetch("api/players").catch(handleError);
  const players = await response.json();
  return players;
}

function handleError(e) {
  console.error(e);
  return null;
}

export { getPlayers };
