import { useEffect, useState } from "react";

export default function PlayPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    async function run() {
      const params = new URLSearchParams(window.location.search);
      const game = params.get("game");
      const token = params.get("token");

      if (!game || !token) {
        setError("초대 링크가 잘못됐어요.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/get-player?game=${game}&token=${token}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRole(data.role);
        setBrand(data.brand || "");
      }
      setLoading(false);
    }
    run();
  }, []);

  if (loading) return <p style={{ padding: 24 }}>불러오는 중...</p>;
  if (error) return <p style={{ padding: 24, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>당신의 역할</h1>
      {role === "spy" ? (
        <>
          <h2>🕵️ 당신은 스파이입니다!</h2>
          <p>다른 사람들의 설명을 듣고 브랜드를 맞혀보세요.</p>
        </>
      ) : (
        <>
          <h2>👥 당신은 브랜드를 아는 사람입니다.</h2>
          <p>오늘의 브랜드는 👇</p>
          <p style={{ fontSize: 28, fontWeight: "bold" }}>{brand}</p>
        </>
      )}
    </div>
  );
}
