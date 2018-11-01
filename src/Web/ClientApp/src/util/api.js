async function getPlayers(budget) {
  const response = await fetch(`api/players?budget=${budget}`).catch(
    handleError
  );
  const players = await response.json();
  return players;
}

function handleError(e) {
  console.error(e);
  return null;
}

export { getPlayers };
