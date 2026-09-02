module.exports = (req, res) => {
  // CORS 허용 (웹페이지에서 API 호출 가능하도록 설정)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // 1. 공개될 목표 시간 설정 (원하는 시간으로 수정하세요)
  const TARGET_TIME = new Date('2026-09-01T14:00:00+09:00').getTime();

  // 2. 외부로 숨길 정답 데이터
  const SECRET_ANSWER = '세종보행교 (이응다리)';

  // 3. 사용자의 시계가 아닌 '서버의 현재 시간'으로 검증
  const now = Date.now();

  if (now >= TARGET_TIME) {
    // 공개 시간이 지난 경우 -> 정답 전달
    res.status(200).json({
      unlocked: true,
      answer: SECRET_ANSWER,
      message: '정답이 공개되었습니다!'
    });
  } else {
    // 공개 시간이 아직 안 된 경우 -> 정답 숨김 (null)
    const remainingSeconds = Math.ceil((TARGET_TIME - now) / 1000);
    res.status(200).json({
      unlocked: false,
      answer: null,
      remainingSeconds: remainingSeconds,
      message: '아직 공개 시간이 되지 않았습니다.'
    });
  }
};
