// api/get-player.js

// 위 파일에서 썼던 전역 저장소 다시 써야 해서 이렇게
global._games = global._games || {};

export default function handler(req, res) {
  const { game, token } = req.query;

  // 1) 해당 게임이 있는지 확인
  const g = global._games[game];
  if (!g) {
    return res
      .status(404)
      .json({ error: "게임을 찾을 수 없어요. 링크를 다시 받아보세요." });
  }

  // 2) 이 게임 안에서 이 토큰 가진 플레이어 찾기
  const player = g.players.find((p) => p.token === token);
  if (!player) {
    return res.status(404).json({ error: "플레이어를 찾을 수 없어요." });
  }

  // 3) 스파이면 역할만, 아니면 브랜드까지 보내주기
  if (player.role === "spy") {
    return res.json({ role: "spy" });
  } else {
    return res.json({ role: "agent", brand: player.brand });
  }
}
