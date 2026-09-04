export default function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { id } = req.query;

  // 🎯 각 미션별 정답, 이미지 목록 및 공개 목표 시간 설정 (KST)
  const missions = {
    "1": {
      answer: "세종 금강보행교 (이응다리)",
      images: ["/answer1.png"],
      openTime: new Date("2026-09-05T00:16:00+09:00").getTime() // 9/12 15:00 KST
    },
    "2": {
      answer: "공주시 공산성 공산정 [위도 = (1+4+1+2) * (2+0+2+2)-(4+4+0+4) = 36.465294 / 경도 = (1+4+1+2)² + 3 * (8+5+2+6) = 127.124898]",
      images: ["/answer2.jpg"],
      openTime: new Date("2026-09-12T16:00:00+09:00").getTime() // 9/12 16:00 KST
    },
    "3": {
      answer: "계룡산 갑사 대웅전",
      images: ["/answer3_1.jpg", "/answer3_2.jpg"],
      openTime: new Date("2026-09-12T17:00:00+09:00").getTime() // 9/12 17:00 KST
    }
  };

  const mission = missions[id];

  if (!mission) {
    return res.status(404).json({ error: "존재하지 않는 미션 ID입니다." });
  }

  // 서버의 현재 시간 검증 (클라이언트 브라우저 시간 조작 불가능)
  const now = Date.now();
  const diff = mission.openTime - now;

  if (diff <= 0) {
    // 🔓 공개 시간이 도달한 경우 정답과 이미지 목록 반환
    return res.status(200).json({
      unlocked: true,
      answer: mission.answer,
      images: mission.images
    });
  } else {
    // 🔒 공개 시간 이전인 경우 남은 시간(초) 반환
    return res.status(200).json({
      unlocked: false,
      remainingSeconds: Math.ceil(diff / 1000)
    });
  }
}
