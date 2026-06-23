import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const APP_HOME = process.env.EX_AI_SKILL_HOME || path.join(os.homedir(), '.ex-ai-skill');

export async function ensureHome() {
  await fs.mkdir(APP_HOME, { recursive: true });
  for (const dir of ['personas', 'uploads', 'conversations', 'exports', 'logs']) {
    await fs.mkdir(path.join(APP_HOME, dir), { recursive: true });
  }
}

export function localFile(...parts) {
  return path.join(APP_HOME, ...parts);
}

export async function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

export async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

export async function appendLog(type, metadata) {
  const filePath = localFile('logs', `${new Date().toISOString().slice(0, 10)}.jsonl`);
  await fs.appendFile(filePath, JSON.stringify({ type, metadata, createdAt: new Date().toISOString() }) + '\n');
}
