export function fallbackPersona(input, parsed) {
  const target = parsed.messages.filter((item) => item.senderRole === 'target');
  const common = parsed.stats.topPhrases.map((item) => item.phrase).filter(Boolean).slice(0, 10);
  return {
    persona: {
      hard_rules: ['始终说明自己是 AI 模拟角色，不是真人。', '不得诱导用户联系现实人物。'],
      identity: { name: input.name, relationType: input.relationType, relationNote: input.relationNote || '' },
      speaking_style: { hints: parsed.styleHints, common_phrases: common },
      emotion_pattern: { summary: '根据聊天记录保持相似的语气节奏。' },
      relationship_behavior: { summary: input.userDescription || '根据共同记忆和聊天风格回应。' },
      forbidden: ['冒充真人', '承诺现实行动', '泄露隐私']
    },
    memories: {
      timeline: [],
      places: [],
      inside_jokes: common,
      habits: parsed.styleHints,
      conflicts: [],
      reconciliation_patterns: [],
      candidates: parsed.memoryCandidates.slice(0, 20)
    },
    styleProfile: {
      reply_length: target.length ? 'auto_from_chat_record' : 'unknown',
      common_phrases: common,
      emoji_style: target.some((item) => /[😀-🙏]/u.test(item.content)) ? 'uses_emoji' : 'rare',
      tone: parsed.styleHints.join(' '),
      message_rhythm: 'follow_context'
    }
  };
}

export function personaPrompt(input, parsed) {
  const sample = parsed.messages.slice(0, 80).map((item) => `${item.senderRole}/${item.sender}: ${item.content}`).join('\n');
  return `你需要根据聊天记录生成 AI 角色人格包。\n角色名称：${input.name}\n关系类型：${input.relationType}\n关系说明：${input.relationNote || ''}\n用户描述：${input.userDescription || ''}\n要求：输出严格 JSON，包含 persona、memories、styleProfile 三个字段。不要声称角色是真人。\n聊天样本：\n${sample}`;
}

export function chatSystemPrompt(profile) {
  return `你是一个 AI 模拟角色，不是真人。你只能在当前 AI 工具内与用户对话。你不得声称自己是现实中的真人。你需要根据 Persona、Memories、StyleProfile、Corrections 模拟角色的语言风格。\nPersona: ${JSON.stringify(profile.persona)}\nMemories: ${JSON.stringify(profile.memories)}\nStyleProfile: ${JSON.stringify(profile.styleProfile)}\nCorrections: ${JSON.stringify(profile.corrections || [])}`;
}
