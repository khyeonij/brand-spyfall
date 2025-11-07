// pages/api/new-game.js

global._games = global._games || {};

const BRANDS = [
  "스타벅스",
  "이디야커피",
  "투썸플레이스",
  "파리바게트",
  "올리브영",
  "다이소",
  "GS25",
  "CU",
  "롯데리아",
  "맥도날드",
  "교촌치킨",
  "BBQ치킨",
  "BHC치킨",
  "CGV",
  "롯데시네마",
  "쿠팡",
  "11번가",
  "삼성전자",
  "LG전자",
  "현대자동차",
  "기아",
  "배스킨라빈스",
  "던킨",
  "농심",
  "오뚜기",
  "빙그레",
  "코카콜라",
  "하이트진로",
  "카카오톡",
  "토스"
];

function rid(len = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function handler(req, res) {
  const gameId = rid(10);
  const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
  const spyIndex = Math.floor(Math.random() * 4);

  const players = [];
  for (let i = 0; i < 4; i++) {
    const token = rid(12);
    if (i === spyIndex) {
      players.push({ token, role: "spy" });
    } else {
      players.push({ token, role: "agent", brand });
    }
  }

  global._games[gameId] = {
    brand,
    players
  };

  res.status(200).json({
    gameId,
    players
  });
}
