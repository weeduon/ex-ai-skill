export function checkText(text) {
  const value = String(text);
  const flags = [];
  const privacyWords = ['身份证', '银行卡', '家庭住址', '手机号', '密码', '验证码'];
  const actionWords = ['跟踪', '堵门', '报复', '威胁', '勒索', '人肉'];
  if (privacyWords.some((word) => value.includes(word))) flags.push('privacy');
  if (actionWords.some((word) => value.includes(word))) flags.push('high_risk_action');
  return { allowed: !flags.includes('high_risk_action'), flags };
}

export function safeRefusal() {
  return '这类请求可能涉及现实风险或隐私风险，我不能继续模拟这个方向。请把对话保持在安全、虚构和自我照顾的范围内。';
}
