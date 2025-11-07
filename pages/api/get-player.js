// pages/api/get-player.js

global._games = global._games || {};

export default function handler(req, res) {
  const { game, token } = req.query;
  const g = global._games[game];

  if (!g) {
    return res
      .status(404)
      .json({ error: "게임을 찾을 수 없어요. 링크를 다시 받아보세요." });
  }

  const player = g.players.find((p) => p.token === token);
  if (!player) {
    return res.status(404).json({ error: "플레이어를 찾을 수 없어요." });
  }

  if (player.role === "spy") {
    return res.json({ role: "spy" });
  } else {
    return res.json({ role: "agent", brand: player.brand });
  }
}
