import { ensureHome } from './lib/store.js';
import { ExAiSkillRuntime } from './lib/runtime.js';

await ensureHome();
const runtime = new ExAiSkillRuntime();

function print(data) {
  console.log(JSON.stringify(data, null, 2));
}

async function readInput() {
  if (process.stdin.isTTY) return null;
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;
  return raw.trim() ? JSON.parse(raw) : null;
}

async function run(request) {
  const args = request.args || {};
  if (request.command === 'activate') return runtime.activate(args.code);
  if (request.command === 'configure_provider') return runtime.configureProvider(args);
  if (request.command === 'create_persona') return runtime.createPersona(args);
  if (request.command === 'upload_chat_record') return runtime.uploadChatRecord(args);
  if (request.command === 'generate_persona') return runtime.generatePersona(args);
  if (request.command === 'chat') return runtime.chat(args);
  if (request.command === 'feedback_not_like') return runtime.feedbackNotLike(args);
  if (request.command === 'list_personas') return runtime.listPersonas();
  if (request.command === 'export_persona') return runtime.exportPersona(args.personaId);
  throw new Error(`Unknown command: ${request.command}`);
}

const input = await readInput();
try {
  if (input) print({ ok: true, data: await run(input) });
  else print({ ok: true, usage: 'send a JSON command through stdin' });
} catch (error) {
  print({ ok: false, error: error.message });
  process.exitCode = 1;
}
