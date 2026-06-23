import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { nanoid } from 'nanoid';
import { localFile, readJson, writeJson } from './store.js';
import { parseChatFile } from './parser.js';
import { callOpenAICompatible } from './llm.js';
import { chatSystemPrompt, fallbackPersona } from './persona.js';

const now = () => new Date().toISOString();
const sha = (text) => createHash('sha256').update(String(text)).digest('hex');

export class ExAiSkillRuntime {
  async activate(code) {
    if (!code || String(code).length < 6) throw new Error('测试码格式不正确，请联系开发者领取测试码。');
    return writeJson(localFile('activation.json'), { activated: true, codeHash: sha(code), localInstanceId: `local_${nanoid(12)}`, activatedAt: now() });
  }

  async requireActivated() {
    const state = await readJson(localFile('activation.json'));
    if (!state?.activated) throw new Error('Skill 尚未激活，请先执行 activate。');
    return state;
  }

  async configureProvider(config) {
    await this.requireActivated();
    const providers = await readJson(localFile('providers.json'), {});
    providers[config.name] = config;
    await writeJson(localFile('providers.json'), providers);
    return { name: config.name, baseUrl: config.baseUrl, model: config.model, saved: true };
  }

  async getProvider(name) {
    const providers = await readJson(localFile('providers.json'), {});
    const provider = providers[name || 'openai'] || Object.values(providers)[0];
    if (!provider) throw new Error('未配置模型 Provider，请先执行 provider:add。');
    return provider;
  }

  async createPersona(input) {
    await this.requireActivated();
    const id = `persona_${nanoid(10)}`;
    const persona = { id, name: input.name, relationType: input.relationType || 'custom', relationNote: input.relationNote || '', userDescription: input.userDescription || '', persona: {}, memories: {}, styleProfile: {}, corrections: [], uploads: [], createdAt: now(), updatedAt: now() };
    return writeJson(localFile('personas', `${id}.json`), persona);
  }

  async listPersonas() {
    await this.requireActivated();
    const files = await fs.readdir(localFile('personas')).catch(() => []);
    const result = [];
    for (const file of files.filter((item) => item.endsWith('.json'))) result.push(await readJson(localFile('personas', file)));
    return result.filter(Boolean);
  }

  async readPersona(personaId) {
    const persona = await readJson(localFile('personas', `${personaId}.json`));
    if (!persona) throw new Error(`角色不存在：${personaId}`);
    return persona;
  }

  async savePersona(persona) {
    persona.updatedAt = now();
    return writeJson(localFile('personas', `${persona.id}.json`), persona);
  }

  async uploadChatRecord(input) {
    await this.requireActivated();
    const persona = await this.readPersona(input.personaId);
    const parsed = await parseChatFile(input.filePath, input.sourceType || 'other');
    const uploadId = `upload_${nanoid(10)}`;
    await writeJson(localFile('uploads', `${uploadId}.json`), { id: uploadId, personaId: input.personaId, filePath: input.filePath, parsed, createdAt: now() });
    persona.uploads.push(uploadId);
    await this.savePersona(persona);
    return { uploadId, stats: parsed.stats };
  }

  async generatePersona(input) {
    await this.requireActivated();
    const persona = await this.readPersona(input.personaId);
    const upload = await readJson(localFile('uploads', `${persona.uploads[0]}.json`));
    if (!upload?.parsed) throw new Error('请先上传聊天记录。');
    const generated = fallbackPersona(persona, upload.parsed);
    persona.persona = generated.persona;
    persona.memories = generated.memories;
    persona.styleProfile = generated.styleProfile;
    return this.savePersona(persona);
  }

  async chat(input) {
    await this.requireActivated();
    const persona = await this.readPersona(input.personaId);
    const provider = await this.getProvider(input.providerName);
    const conversationId = `conv_${input.personaId}`;
    const historyPath = localFile('conversations', `${conversationId}.json`);
    const history = await readJson(historyPath, []);
    history.push({ id: `msg_${nanoid(10)}`, conversationId, personaId: input.personaId, role: 'user', content: input.message, createdAt: now() });
    const reply = await callOpenAICompatible(provider, [{ role: 'system', content: chatSystemPrompt(persona) }, ...history.slice(-12).map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))], input.model);
    const output = { id: `msg_${nanoid(10)}`, conversationId, personaId: input.personaId, role: 'assistant', content: reply.content, provider: provider.name, model: input.model || provider.model, usage: reply.usage, createdAt: now() };
    history.push(output);
    await writeJson(historyPath, history);
    return output;
  }

  async feedbackNotLike(input) {
    await this.requireActivated();
    const persona = await this.readPersona(input.personaId);
    const correction = { id: `corr_${nanoid(10)}`, messageId: input.messageId || '', feedback: input.feedback, rule: `后续回复需要修正：${input.feedback}`, createdAt: now() };
    persona.corrections.push(correction);
    await this.savePersona(persona);
    return correction;
  }

  async exportPersona(personaId) {
    const persona = await this.readPersona(personaId);
    const filePath = localFile('exports', `${personaId}.json`);
    await writeJson(filePath, persona);
    return { filePath };
  }
}
