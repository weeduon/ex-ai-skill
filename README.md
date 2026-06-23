# 前任AIskill

> 一个可安装到 OpenClaw、OpenClaw-like Agent、桌面 AI 助手或自托管 AI 工具中的「关系角色模拟」Skill。  
> 用户在本地上传聊天记录，使用自己的大模型 API Key 与 tokens，生成 Persona / Memories / StyleProfile / Corrections，并在 AI 工具内直接对话。  
> 本项目模拟的是 **AI 角色**，不是现实中的真人。别把人类关系这摊复杂泥巴再往法律和伦理火坑里推，机器已经够忙了。

---

## 1. 项目简介

**前任AIskill** 是一个本地优先运行的 AI 关系角色模拟 Skill。它允许用户把微信、QQ、iMessage、短信、Telegram、WhatsApp 等聊天记录导入本地，由 Skill 解析聊天记录并生成角色人格包，然后通过用户自己的 API Key 调用 OpenAI / Grok / 硅基流动 / Gemini / Claude / 本地模型等大模型，在 OpenClaw 等 AI 助手中完成对话。

本仓库主要开源 **Skill 客户端 / Skill 前端层**，用于安装到 AI 工具中。  
运营后台、测试码生成、审计、数据保留策略、导出和实时监控可由配套后端提供。

---

## 2. 核心变化

本项目从传统网页聊天系统调整为 **AI 工具 Skill 形态**。

### 已删除

- 用户端网页登录 / 注册
- 用户端独立网页聊天页面
- 会员系统
- 卡密兑换 tokens 系统
- 平台侧 tokens 余额限制
- 平台侧模型额度扣费逻辑
- 用户端复杂账号体系

### 已保留

- 运营后台
- 测试码生成与管理
- 测试码绑定 / 激活
- 聊天记录上传与解析
- Persona / Memories / StyleProfile / Corrections 生成
- 多模型 Provider 抽象
- 后台数据查看与导出
- 实时聊天监控，可选
- 数据保留天数配置
- 自动清理
- RBAC 权限
- 审计日志
- 内容安全与隐私提示

### 已调整

- 原「卡密」改为「测试码 / Activation Code」
- 原「用户账号」改为「本地设备实例 / Local Instance」
- 原「网页前端」改为「Skill 插件交互层」
- 原「平台 tokens 扣费」改为「用户自带 API Key，自行承担模型消耗」
- 原「用户端会话」改为「AI 工具内对话」

---

## 3. 适用场景

- OpenClaw Skill
- OpenClaw Agent 工具插件
- 本地 AI 助手插件
- 企业内部 AI 工具扩展
- 自托管 AI 情感陪伴实验
- AI 短剧角色语气模拟
- 个人聊天风格研究
- Persona / Memory / StyleProfile 数据生成

---

## 4. 重要声明

本项目不是「复活前任」，也不是「让 AI 冒充真人」。

系统必须明确展示：

- 这是 AI 模拟角色，不是真人。
- AI 回复由模型生成，不代表现实人物真实表达。
- 不得将 AI 回复当作现实人物的承诺、态度或证据。
- 不得使用本项目骚扰、跟踪、威胁、勒索或诱导现实中的任何人。
- 不得上传未经授权的聊天记录、隐私数据或敏感内容。
- 不得把本项目用于未成年人性内容、违法交易、诈骗、仇恨暴力、自伤鼓励等场景。

本项目可以去掉商业额度限制，但不能去掉基本安全底线。人类社会已经够像线上副本了，别再主动开地狱难度。

---

## 5. 功能特性

### 5.1 Skill 客户端

- 在 AI 工具内运行，无需用户打开独立网页
- 输入测试码完成激活
- 本地配置 OpenAI / Grok / 硅基流动 / Gemini / Claude / 本地模型 API Key
- 本地上传聊天记录
- 本地解析聊天记录
- 生成角色人格包
- 创建多个关系角色
- 与角色连续对话
- 支持「不像 TA」纠正
- 支持重新生成
- 支持删除角色
- 支持清空本地会话
- 支持导出本地角色包
- 支持导入角色包

### 5.2 聊天记录解析

MVP 支持：

- `.txt`
- `.csv`
- `.json`
- `.html`
- `.zip`

后续可扩展：

- `.mht`
- `.db`
- PDF
- 图片 OCR
- 微信备份数据库
- QQ 消息导出
- Telegram 导出包

解析目标：

- 发言人识别
- 时间线识别
- 消息内容提取
- 表情占位符保留
- 图片 / 语音 / 文件占位符保留
- 高频词统计
- 常用语气词统计
- 情绪片段筛选
- 争吵片段筛选
- 和解片段筛选
- 共同记忆候选提取

### 5.3 角色人格包

生成结构：

```json
{
  "persona": {
    "hard_rules": [],
    "identity": {},
    "speaking_style": {},
    "emotion_pattern": {},
    "relationship_behavior": {},
    "forbidden": []
  },
  "memories": {
    "timeline": [],
    "places": [],
    "inside_jokes": [],
    "habits": [],
    "conflicts": [],
    "reconciliation_patterns": []
  },
  "style_profile": {
    "reply_length": "",
    "common_phrases": [],
    "emoji_style": "",
    "tone": "",
    "message_rhythm": ""
  },
  "corrections": []
}
```

---

## 6. 系统架构

```txt
前任AIskill/
├── apps/
│   ├── skill/                 # OpenClaw / AI 工具 Skill 客户端
│   ├── admin-api/             # 运营后台 API
│   └── admin-web/             # 运营后台页面，可不开源或单独部署
├── packages/
│   ├── core/                  # Skill 核心逻辑
│   ├── parsers/               # 聊天记录解析器
│   ├── persona/               # Persona / Memory / StyleProfile 构建
│   ├── llm/                   # 多模型 Provider
│   ├── safety/                # 内容安全与隐私规则
│   ├── storage/               # 本地存储 / 远端存储适配
│   ├── activation/            # 测试码绑定逻辑
│   └── shared/                # 通用类型与工具
├── prisma/
│   └── schema.prisma
├── docker/
│   ├── nginx.conf
│   └── entrypoint.sh
├── docs/
│   ├── skill-protocol.md
│   ├── openclaw-install.md
│   └── privacy.md
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

## 7. 工作流程

```txt
用户安装 Skill
→ 输入后台生成的测试码
→ Skill 绑定本地设备实例
→ 用户配置自己的 API Key
→ 用户创建角色
→ 上传聊天记录
→ 本地解析聊天记录
→ 调用用户自己的模型生成 Persona
→ 在 AI 工具助手中直接对话
→ 用户可反馈「不像 TA」
→ Corrections 追加修正规则
→ 后续回复优先遵守修正规则
```

---

## 8. OpenClaw 安装方式

### 8.1 从源码安装

```bash
git clone https://github.com/YOUR_NAME/前任AIskill.git
cd 前任AIskill

pnpm install
pnpm build
```

### 8.2 导入 OpenClaw

在 OpenClaw 中添加本地 Skill：

```txt
Skill Name: 前任AIskill
Entry: apps/skill/dist/index.js
Config: apps/skill/skill.json
Runtime: node
```

### 8.3 Skill 配置示例

```json
{
  "name": "前任AIskill",
  "displayName": "前任 AI Skill",
  "description": "通过聊天记录生成 AI 关系角色，并在 AI 工具中对话。",
  "version": "0.1.0",
  "entry": "dist/index.js",
  "permissions": [
    "file.read",
    "file.write",
    "network.request",
    "localStorage.read",
    "localStorage.write"
  ],
  "commands": [
    "activate",
    "configure_provider",
    "create_persona",
    "upload_chat_record",
    "generate_persona",
    "chat",
    "regenerate",
    "feedback_not_like",
    "export_persona",
    "delete_persona"
  ]
}
```

---

## 9. 环境变量

复制配置文件：

```bash
cp .env.example .env
```

示例：

```env
APP_ENV=development
APP_URL=http://localhost:3000

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ex_ai_skill
REDIS_URL=redis://redis:6379

ADMIN_JWT_SECRET=change_me_admin_secret
ACTIVATION_CODE_SECRET=change_me_activation_secret

STORAGE_DRIVER=local
LOCAL_STORAGE_DIR=./storage

OPENAI_BASE_URL=https://api.openai.com/v1
XAI_BASE_URL=https://api.x.ai/v1
SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1

DEFAULT_PROVIDER=openai
DEFAULT_MODEL=gpt-4.1-mini

UPLOAD_RETENTION_DAYS=7
CHAT_RETENTION_DAYS=30
EXPORT_FILE_RETENTION_HOURS=24

ENABLE_ADMIN_LIVE_MONITOR=true
ENABLE_REMOTE_AUDIT=false
ENABLE_SAFETY_FILTER=true
```

注意：用户自己的 API Key 默认保存在本地 Skill 配置中，不应该上传到后台。别把密钥塞进前端源码里，这种操作一般只会让攻击者笑出声。

---

## 10. 用户自带 API Key

用户可以在 Skill 内配置多个 Provider：

```json
{
  "providers": [
    {
      "name": "openai",
      "baseUrl": "https://api.openai.com/v1",
      "apiKey": "sk-...",
      "model": "gpt-4.1-mini"
    },
    {
      "name": "xai",
      "baseUrl": "https://api.x.ai/v1",
      "apiKey": "xai-...",
      "model": "grok-3-mini"
    },
    {
      "name": "siliconflow",
      "baseUrl": "https://api.siliconflow.cn/v1",
      "apiKey": "sk-...",
      "model": "Qwen/Qwen2.5-72B-Instruct"
    }
  ]
}
```

### API Key 处理原则

- API Key 只保存在用户本地
- 默认不上传后台
- 支持本地加密存储
- 支持用户随时删除
- 支持按角色选择不同 Provider
- 支持按任务选择模型，例如解析、人格生成、聊天

---

## 11. 测试码激活机制

测试码用于替代原来的卡密系统。

### 11.1 测试码用途

- 激活 Skill
- 绑定本地设备实例
- 区分测试用户
- 控制内测资格
- 允许后台查看绑定状态
- 可选开启远程审计或同步

### 11.2 测试码格式

```txt
EXAI-TEST-XXXX-XXXX
```

### 11.3 测试码状态

```txt
active      可用
used        已使用
disabled    已禁用
expired     已过期
revoked     已撤销
```

### 11.4 后台生成测试码

```bash
pnpm admin activation:create --count 10 --expires 2026-12-31 --note "内测第一批"
```

### 11.5 Skill 激活

在 OpenClaw 中输入：

```txt
/前任AIskill activate EXAI-TEST-XXXX-XXXX
```

或使用自然语言：

```txt
使用测试码 EXAI-TEST-XXXX-XXXX 激活前任AIskill
```

### 11.6 绑定数据

```json
{
  "activationCodeHash": "sha256_hash",
  "localInstanceId": "local_xxx",
  "deviceName": "Windows Desktop",
  "activatedAt": "2026-01-01T10:00:00.000Z",
  "lastSeenAt": "2026-01-01T12:00:00.000Z"
}
```

---

## 12. 运营后台

虽然用户端改为 Skill，但运营后台保留。

### 后台功能

- 管理员登录
- RBAC 权限管理
- 测试码生成
- 测试码批量生成
- 测试码禁用 / 撤销
- 测试码绑定记录
- 本地实例管理
- 上传记录管理，可选远程同步
- 聊天记录管理，可选远程同步
- 实时聊天监控，可选
- 系统设置
- 自动清理设置
- 审计日志
- 安全日志
- 数据导出

### 后台路由

```txt
/admin/login
/admin/dashboard
/admin/activation-codes
/admin/instances
/admin/uploads
/admin/uploads/:id
/admin/conversations
/admin/conversations/:id
/admin/live-chats
/admin/settings
/admin/audit-logs
/admin/safety-logs
```

---

## 13. 数据同步模式

本项目建议支持两种模式。

### 13.1 Local-Only 模式

默认模式。

- 上传聊天记录只保存在用户本地
- API Key 只保存在用户本地
- 对话记录只保存在用户本地
- 后台只记录测试码激活状态
- 不上传原文聊天内容

适合开源版本。

### 13.2 Managed-Audit 模式

运营模式。

- 用户明确同意后，上传记录元信息可同步后台
- 用户明确同意后，聊天记录可同步后台
- 原文查看和下载必须写入审计日志
- 管理员按 RBAC 权限查看脱敏或原文
- 数据按后台保留天数自动清理

适合自托管运营版本。

---

## 14. 隐私与数据保护

### 本地数据

默认保存位置：

```txt
~/.ex-ai-skill/
├── config.json
├── providers.enc.json
├── personas/
├── uploads/
├── conversations/
└── logs/
```

### 删除机制

用户可以删除：

- 角色
- 上传文件
- 解析数据
- 对话记录
- Provider API Key
- 本地实例绑定

管理员可以删除：

- 测试码
- 绑定实例
- 远程上传记录
- 远程会话记录
- 导出任务
- 风控命中内容

---

## 15. Prompt 设计

### 15.1 角色生成 Prompt

目标：根据聊天记录提取语言风格、关系记忆和行为模式，不重新训练模型。

输出必须是 JSON：

```txt
你需要根据用户上传的聊天记录生成 AI 角色人格包。
你不能声称该角色是真实人物。
你需要提取 Persona、Memories、StyleProfile。
你需要过滤违法、威胁、隐私泄露、自伤鼓励等高风险内容。
输出必须是严格 JSON，不要输出 Markdown。
```

### 15.2 聊天系统 Prompt

```txt
你是一个 AI 模拟角色，不是真人。
你只能在当前 AI 工具内与用户对话。
你不得声称自己是现实中的真人。
你不得诱导用户骚扰、联系、跟踪现实中的任何人。
你不得输出隐私泄露、威胁、勒索、违法内容。
你需要根据 Persona、Memories、StyleProfile、Corrections 模拟角色的语言风格。
如果用户表达强烈痛苦、自伤倾向或现实骚扰意图，应温和阻止，并建议用户暂停使用、寻求现实支持。
```

### 15.3 纠正层 Prompt

```txt
根据用户反馈，提炼成一条可执行的角色行为修正规则。
不要覆盖原始 Persona。
把修正规则追加到 Corrections。
后续生成回复时 Corrections 优先级高于 Persona。
输出严格 JSON。
```

---

## 16. Skill 命令设计

### activate

```txt
激活 Skill。
输入：测试码
输出：激活状态
```

### configure_provider

```txt
配置用户自己的模型 Provider。
输入：provider、baseUrl、apiKey、model
输出：配置成功状态
```

### create_persona

```txt
创建角色基础信息。
输入：角色名称、关系类型、关系说明、用户主观描述
输出：personaId
```

### upload_chat_record

```txt
上传聊天记录文件。
输入：filePath、sourceType、personaId
输出：uploadId、解析状态
```

### generate_persona

```txt
生成人格包。
输入：personaId、uploadIds
输出：Persona / Memories / StyleProfile
```

### chat

```txt
与角色对话。
输入：personaId、message、provider、model
输出：AI 回复、usage
```

### feedback_not_like

```txt
提交「不像 TA」反馈。
输入：personaId、messageId、feedback
输出：Correction 规则
```

### export_persona

```txt
导出角色包。
输入：personaId
输出：persona.zip
```

---

## 17. API 设计

### 17.1 Activation

```txt
POST /api/activation/verify
POST /api/activation/bind
POST /api/activation/heartbeat
POST /api/activation/revoke-local
```

### 17.2 Admin Activation Codes

```txt
GET    /api/admin/activation-codes
POST   /api/admin/activation-codes
POST   /api/admin/activation-codes/batch
PATCH  /api/admin/activation-codes/:id
GET    /api/admin/activation-codes/export.csv
```

### 17.3 Admin Instances

```txt
GET    /api/admin/instances
GET    /api/admin/instances/:id
PATCH  /api/admin/instances/:id/status
DELETE /api/admin/instances/:id
```

### 17.4 Admin Uploads

```txt
GET    /api/admin/uploads
GET    /api/admin/uploads/:id
DELETE /api/admin/uploads/:id
GET    /api/admin/uploads/:id/download/raw
GET    /api/admin/uploads/:id/download/json
GET    /api/admin/uploads/:id/download/csv
```

### 17.5 Admin Conversations

```txt
GET    /api/admin/conversations
GET    /api/admin/conversations/:id
DELETE /api/admin/conversations/:id
GET    /api/admin/conversations/:id/download/json
GET    /api/admin/conversations/:id/download/csv
GET    /api/admin/conversations/:id/download/txt
```

---

## 18. 数据库核心模型

### ActivationCode

```prisma
model ActivationCode {
  id          String   @id @default(cuid())
  batchId     String?
  codeHash    String   @unique
  maxUses     Int      @default(1)
  usedCount   Int      @default(0)
  status      String   @default("active")
  expiresAt   DateTime?
  note        String?
  createdAt   DateTime @default(now())
  bindings    LocalInstance[]
}
```

### LocalInstance

```prisma
model LocalInstance {
  id              String   @id @default(cuid())
  activationCodeId String
  instanceKeyHash String   @unique
  deviceName      String?
  status          String   @default("active")
  lastSeenAt      DateTime?
  createdAt       DateTime @default(now())

  activationCode  ActivationCode @relation(fields: [activationCodeId], references: [id])
}
```

### Persona

```prisma
model Persona {
  id              String   @id @default(cuid())
  localInstanceId String
  name            String
  avatarUrl       String?
  relationType    String
  relationNote    String?
  userDescription String?
  personaJson     Json?
  memoriesJson    Json?
  styleJson       Json?
  correctionsJson Json?
  status          String   @default("active")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 19. Docker 部署

启动后台依赖：

```bash
docker compose up -d --build
```

初始化数据库：

```bash
docker compose exec admin-api pnpm prisma migrate deploy
docker compose exec admin-api pnpm seed:admin
```

生成测试码：

```bash
docker compose exec admin-api pnpm admin activation:batch --count 100 --note "内测码"
```

---

## 20. 开发命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```

运行 Skill：

```bash
pnpm --filter @ex-ai-skill/skill dev
```

运行后台 API：

```bash
pnpm --filter @ex-ai-skill/admin-api dev
```

运行后台页面：

```bash
pnpm --filter @ex-ai-skill/admin-web dev
```

---

## 21. 开源范围建议

建议开源：

- Skill 客户端
- Parser
- Persona Builder
- LLM Provider 抽象
- 本地存储层
- OpenClaw 安装配置
- README / docs
- 基础测试

建议不开源或单独私有化：

- 运营后台完整源码
- 审计系统实现细节
- 风控策略细节
- 批量数据导出逻辑
- 商业化管理策略
- 远程实时监控策略

---

## 22. 安全边界

本项目不会帮助用户：

- 自动联系现实中的前任、家人或朋友
- 自动向微信、QQ、短信等外部平台发消息
- 跟踪、骚扰、威胁、勒索现实人物
- 生成用于诈骗、恐吓、色情剥削、未成年人相关违法内容
- 泄露第三方隐私
- 绕过平台或模型的必要安全限制

---

## 23. Roadmap

### Phase 1：Skill 骨架

- OpenClaw Skill manifest
- 本地配置
- 测试码输入
- Provider 配置
- 本地存储

### Phase 2：Parser

- TXT 解析
- CSV 解析
- JSON 解析
- HTML 解析
- ZIP 解包
- 基础统计

### Phase 3：Persona Builder

- Persona 生成
- Memories 生成
- StyleProfile 生成
- Corrections 追加

### Phase 4：Chat Runtime

- 多模型调用
- 上下文拼接
- 本地会话保存
- 重新生成
- 「不像 TA」反馈

### Phase 5：Admin Backend

- 测试码生成
- 实例管理
- 上传记录管理
- 会话记录管理
- 审计日志
- 自动清理

### Phase 6：Open Source Release

- README
- 安装文档
- 示例聊天记录
- 示例角色包
- GitHub Actions
- License

---

## 24. License

建议使用：

```txt
AGPL-3.0
```

如果你希望别人可以商用二开，可改为：

```txt
MIT
```

如果你希望开源但保留商业授权，可以使用：

```txt
PolyForm Noncommercial
```

---

## 25. 常见问题

### Q：这个项目会训练模型吗？

不会。系统不重新训练模型，只通过聊天记录生成 Persona、Memories、StyleProfile 和 Corrections，然后在 Prompt 中调用大模型模拟风格。

### Q：用户需要购买平台 tokens 吗？

不需要。用户使用自己的 API Key 和自己的模型 tokens。平台不再做用户端 tokens 扣费。

### Q：还需要注册登录吗？

用户端不需要。用户只需要输入后台生成的测试码激活 Skill。管理员后台仍然需要登录和权限控制。

### Q：测试码是不是卡密？

不是原来的商业卡密。测试码只用于激活和绑定本地实例，不负责 tokens 充值。

### Q：聊天记录会上传到后台吗？

默认 Local-Only 模式不会上传原文。Managed-Audit 模式需要用户明确同意，并且所有查看、下载原文行为都必须写入审计日志。

### Q：可以完全删除安全限制吗？

不建议，也不应当。可以删除注册、会员、卡密、平台 tokens、每日消息数这类商业限制，但不能删除防骚扰、防违法、防隐私泄露、防自伤鼓励等底线规则。

---

## 26. 致开发者

这个项目的核心不是「假装某个真人还在」，而是把聊天记录转成可控的人格风格数据，用于 AI 角色模拟、情绪陪伴、文本风格研究和 AI 短剧角色创作。

请保持克制，做好删除、审计、告知和本地优先。  
人类已经能把一个聊天气泡想象成整个宇宙了，我们至少别把宇宙部署成灾难。
