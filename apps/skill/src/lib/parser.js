import AdmZip from 'adm-zip';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function parseChatFile(filePath, sourceType = 'other') {
  if (!existsSync(filePath)) throw new Error(`文件不存在：${filePath}`);
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.zip') {
    const zip = new AdmZip(filePath);
    const chunks = zip.getEntries()
      .filter((entry) => !entry.isDirectory && /\.(txt|csv|json|html)$/i.test(entry.entryName))
      .map((entry) => entry.getData().toString('utf8'));
    return parsePlainText(chunks.join('\n'), sourceType);
  }
  const raw = await fs.readFile(filePath, 'utf8');
  if (ext === '.html' || ext === '.htm') return parsePlainText(stripHtml(raw), sourceType);
  if (ext === '.csv') return parsePlainText(parseCsv(raw), sourceType);
  if (ext === '.json') return parsePlainText(parseJson(raw), sourceType);
  return parsePlainText(raw, sourceType);
}

export function parsePlainText(text, sourceType = 'other') {
  const rows = String(text).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const messages = [];
  const senders = new Map();
  const phrases = new Map();
  for (const raw of rows) {
    const msg = parseLine(raw);
    if (!msg.content) continue;
    senders.set(msg.sender, (senders.get(msg.sender) || 0) + 1);
    for (const phrase of pickPhrases(msg.content)) phrases.set(phrase, (phrases.get(phrase) || 0) + 1);
    messages.push(msg);
  }
  assignRoles(messages, senders);
  return {
    sourceType,
    participants: [...senders.keys()].map((name) => ({ name, role: messages.find((m) => m.sender === name)?.senderRole || 'unknown' })),
    messages,
    stats: {
      totalMessages: messages.length,
      selfMessages: messages.filter((m) => m.senderRole === 'self').length,
      targetMessages: messages.filter((m) => m.senderRole === 'target').length,
      topSenders: top(senders),
      topPhrases: top(phrases).map((item) => ({ phrase: item.sender, count: item.count }))
    },
    styleHints: buildStyleHints(messages),
    memoryCandidates: messages.filter((m) => m.content.length >= 18 && m.content.length <= 160).slice(0, 40).map((m) => m.content),
    riskFlags: []
  };
}

function parseLine(raw) {
  const withTime = raw.match(/^\[?(\d{4}[-/.]\d{1,2}[-/.]\d{1,2}[ T]\d{1,2}:\d{2}(?::\d{2})?)\]?\s+([^:：]{1,40})[:：]\s*(.+)$/);
  if (withTime) return { sender: withTime[2].trim(), senderRole: 'unknown', content: withTime[3].trim(), messageType: detectType(withTime[3]), timestamp: normalizeTime(withTime[1]), raw };
  const simple = raw.match(/^([^:：]{1,40})[:：]\s*(.+)$/);
  if (simple) return { sender: simple[1].trim(), senderRole: 'unknown', content: simple[2].trim(), messageType: detectType(simple[2]), raw };
  return { sender: 'unknown', senderRole: 'unknown', content: raw, messageType: detectType(raw), raw };
}

function normalizeTime(value) {
  const d = new Date(String(value).replace(/[/.]/g, '-').replace(' ', 'T'));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function assignRoles(messages, senders) {
  const names = [...senders.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
  for (const message of messages) {
    message.senderRole = message.sender === names[0] ? 'self' : message.sender === names[1] ? 'target' : 'unknown';
  }
}

function pickPhrases(content) {
  return String(content).replace(/[，。！？、,.!?]/g, ' ').split(/\s+/).filter((p) => p.length >= 2 && p.length <= 12).slice(0, 8);
}

function top(map, limit = 12) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([sender, count]) => ({ sender, count }));
}

function buildStyleHints(messages) {
  const target = messages.filter((m) => m.senderRole === 'target');
  const avg = target.length ? Math.round(target.reduce((sum, m) => sum + m.content.length, 0) / target.length) : 0;
  const hints = [];
  if (avg <= 8) hints.push('目标角色回复偏短，表达克制。');
  if (avg > 30) hints.push('目标角色回复较长，喜欢解释和补充细节。');
  if (target.some((m) => /哈哈|hhh|笑死|😂/.test(m.content))) hints.push('目标角色会用玩笑或笑声缓和气氛。');
  if (target.some((m) => /嗯|哦|行|随便/.test(m.content))) hints.push('目标角色存在短句回应模式。');
  return hints;
}

function detectType(content) {
  if (/\[图片\]|<image>|图片/.test(content)) return 'image';
  if (/\[语音\]|<voice>|语音/.test(content)) return 'voice';
  if (/\[文件\]|<file>|文件/.test(content)) return 'file';
  return 'text';
}

function stripHtml(input) {
  return String(input).replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
}

function parseCsv(raw) {
  return raw.split(/\r?\n/).map((line) => line.split(',')).map((row) => `${row[0] || ''} ${row[1] || 'unknown'}: ${row.slice(2).join(' ')}`).join('\n');
}

function parseJson(raw) {
  const data = JSON.parse(raw);
  const arr = Array.isArray(data) ? data : data.messages || [];
  return arr.map((m) => `${m.timestamp || ''} ${m.sender || m.role || 'unknown'}: ${m.content || m.text || ''}`).join('\n');
}
