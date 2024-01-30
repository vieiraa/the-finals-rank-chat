import express from 'express';

const app = express();
app.use(express.json());

async function getPlayerData(name, tag) {
  return new Promise((resolve, reject) => {
    const url = "https://storage.googleapis.com/embark-discovery-leaderboard/leaderboard-crossplay-discovery-live.json";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        resolve(data.filter(function (player) {
          const playerName = player.name.split("#")[0];
          const playerTag = player.name.split("#")[1];
          return playerName === name && playerTag === tag;
        })[0]);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getPlayerRank(playerFame) {
  if (playerFame >= 23750)
    return "Diamond 1";
  else if (playerFame >= 22500)
    return "Diamond 2";
  else if (playerFame >= 21250)
    return "Diamond 3";
  else if (playerFame >= 20000)
    return "Diamond 4";
  else if (playerFame >= 18750)
    return "Platinum 1";
  else if (playerFame >= 17500)
    return "Platinum 2";
  else if (playerFame >= 16250)
    return "Platinum 3";
  else if (playerFame >= 15000)
    return "Platinum 4";
  else if (playerFame >= 13750)
    return "Gold 1";
  else if (playerFame >= 12500)
    return "Gold 2";
  else if (playerFame >= 11250)
    return "Gold 3";
  else if (playerFame >= 10000)
    return "Gold 4";
  else if (playerFame >= 8750)
    return "Silver 1";
  else if (playerFame >= 7500)
    return "Silver 2";
  else if (playerFame >= 6250)
    return "Silver 3";
  else if (playerFame >= 5000)
    return "Silver 4";
  else if (playerFame >= 3750)
    return "Bronze 1";
  else if (playerFame >= 2500)
    return "Bronze 2";
  else if (playerFame >= 1250)
    return "Bronze 3";

  return "Bronze 4";
}

app.get('/the-finals/:name/:tag', async (req, res) => {
  const name = req.params.name;
  const tag = req.params.tag;

  const data = await getPlayerData(name, tag);
  
  res.send(`${name}#${tag} - Elo: ${getPlayerRank(parseInt(data.f))}, rank na tabela: ${data.r}`);
});

app.listen(3000, () => {
  console.log('Express server initialized');
});