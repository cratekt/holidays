module.exports = (req, res) => {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;

  // 문제별 정답 및 공개 시간 데이터 설정
  const MISSIONS = {
    "1": {
      // 2026년 9월 3일 오후 1시 (13:00:00) 설정
      targetTime: new Date("2026-09-03T13:00:00+09:00").getTime(),
      answer: "세종 금강보행교 (이응다리)"
    }
  };

  const selectedMission = MISSIONS[id];

  if (!selectedMission) {
    return res.status(404).json({ error: "존재하지 않는 미션입니다." });
  }

  const now = Date.now();

  if (now >= selectedMission.targetTime) {
    // 공개 시간이 지난 경우 -> 정답 리턴
    res.status(200).json({
      unlocked: true,
      answer: selectedMission.answer,
      message: "미션 정답이 공개되었습니다!"
    });
  } else {
    // 공개 시간이 안 된 경우 -> 남은 초 리턴 (정답 보안 유지)
    const remainingSeconds = Math.ceil((selectedMission.targetTime - now) / 1000);
    res.status(200).json({
      unlocked: false,
      answer: null,
      remainingSeconds: remainingSeconds,
      message: "아직 공개 시간이 되지 않았습니다."
    });
  }
};
