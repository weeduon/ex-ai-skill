# 前任AIskill

> 一个可安装到 OpenClaw、桌面 AI 助手或自托管 AI 工具中的关系角色模拟 Skill。  
> 用户在本地上传聊天记录，使用自己的大模型 API Key 与 tokens，生成 Persona / Memories / StyleProfile / Corrections，并在 AI 工具内直接对话。  
> 本项目模拟的是 **AI 角色**，不是现实中的真人。别把一个聊天气泡幻想成宇宙真理，人类已经很擅长自我折磨了。

---

## 1. 项目简介

**前任AIskill** 是一个本地优先运行的 AI 关系角色模拟 Skill。

它可以帮助用户把微信、QQ、iMessage、短信、Telegram、WhatsApp 等聊天记录导入本地，由 Skill 解析聊天记录并生成角色人格包，然后通过用户自己的 API Key 调用 OpenAI / Grok / 硅基流动 / Gemini / Claude / 本地模型等大模型，在 OpenClaw 等 AI 助手中完成对话。

本仓库开源范围为 **Skill 客户端 / Skill 前端交互层 / 本地解析与人格生成逻辑**。

---

## 2. 重要声明

本项目不是「复活前任」，也不是「让 AI 冒充真人」。

使用本项目时必须理解：

- 这是 AI 模拟角色，不是真人。
- AI 回复由模型生成，不代表现实人物真实表达。
- 不得将 AI 回复当作现实人物的承诺、态度、证据或真实想法。
- 不得使用本项目骚扰、跟踪、威胁、勒索或诱导现实中的任何人。
- 不得上传未经授权的聊天记录、隐私数据或敏感内容。
- 不得把本项目用于诈骗、违法交易、仇恨暴力、自伤鼓励、未成年人相关违法内容等场景。

可以删除商业限制，但不能删除基本安全底线。否则这就不是 Skill，是把现实关系的烂摊子装进自动化搅拌机，技术含量很高，结果很糟。

---

## 3. 项目定位

本项目从传统网页聊天系统调整为 **AI 工具 Skill 形态**。

### 已移除

- 用户端网页登录 / 注册
- 用户端独立网页聊天页面
- 会员系统
- 卡密兑换 tokens 系统
- 平台侧 tokens 余额限制
- 平台侧模型额度扣费逻辑
- 用户端复杂账号体系

### 当前模式

- 用户安装 Skill
- 用户输入测试码激活
- 用户自行配置 API Key
- 用户自行承担模型 tokens 消耗
- 用户本地上传聊天记录
- 用户本地生成 AI 角色人格包
- 用户在 OpenClaw 等 AI 工具内直接对话

---

## 4. 测试码说明

本项目目前处于测试阶段，需要输入测试码激活。

测试码用于：

- 激活 Skill 测试资格
- 识别测试版本
- 避免未授权分发
- 方便开发者收集问题反馈

### 如何获取测试码

请联系项目开发者领取测试码。

> 测试码不用于充值，不代表会员权益，也不包含任何模型 tokens。  
> 用户调用大模型时，消耗的是用户自己 API Key 对应账户中的 tokens 或余额。

---

## 5. 适用场景

- OpenClaw Skill
- OpenClaw Agent 工具插件
- 本地 AI 助手插件
- 自托管 AI 工具扩展
- AI 关系角色模拟
- AI 短剧角色语气模拟
- 个人聊天风格研究
- Persona / Memory / StyleProfile 数据生成

---

## 6. 功能特性

### 6.1 Skill 客户端

- 在 AI 工具内运行，无需用户打开独立网页
- 输入测试码完成激活
- 本地配置 OpenAI / Grok / 硅基流动 / Gemini / Claude / 本地模型 API Key
- 本地上传聊天记录
- 本地解析聊天记录
- 生成角色人格包
- 创建多个关系角色
- 与角色连续对话
- 支持重新生成回复
- 支持「不像 TA」纠正
- 支持删除角色
- 支持清空本地会话
- 支持导出本地角色包
- 支持导入角色包

### 6.2 聊天记录解析

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

### 6.3 角色人格包

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

## 7. 系统架构

```txt
前任AIskill/
├── apps/
│   └── skill/                 # OpenClaw / AI 工具 Skill 客户端
├── packages/
│   ├── core/                  # Skill 核心逻辑
│   ├── parsers/               # 聊天记录解析器
│   ├── persona/               # Persona / Memory / StyleProfile 构建
│   ├── llm/                   # 多模型 Provider
│   ├── safety/                # 内容安全与隐私规则
│   ├── storage/               # 本地存储适配
│   ├── activation/            # 测试码激活逻辑
│   └── shared/                # 通用类型与工具
├── docs/
│   ├── skill-protocol.md
│   ├── openclaw-install.md
│   └── privacy.md
├── examples/
│   ├── sample-chat.txt
│   └── sample-persona.json
├── .env.example
├── package.json
└── README.md
```

---

## 8. 工作流程

```txt
用户安装 Skill
→ 联系开发者领取测试码
→ 输入测试码激活 Skill
→ 用户配置自己的 API Key
→ 用户创建角色
→ 上传聊天记录
→ 本地解析聊天记录
→ 调用用户自己的模型生成 Persona
→ 在 AI 工具助手中直接对话
→ 用户反馈「不像 TA」
→ Corrections 追加修正规则
→ 后续回复优先遵守修正规则
```

---

## 9. OpenClaw 安装方式

### 9.1 从源码安装

```bash
git clone https://github.com/weeduon/ex-ai-skill.git
cd ex-ai-skill

pnpm install
pnpm build
```

### 9.2 导入 OpenClaw

在 OpenClaw 中添加本地 Skill：

```txt
Skill Name: 前任AIskill
Entry: apps/skill/dist/index.js
Config: apps/skill/skill.json
Runtime: node
```

### 9.3 Skill 配置示例

```json
{
  "name": "ex-ai-skill",
  "displayName": "前任AIskill",
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

## 10. 环境变量

复制配置文件：

```bash
cp .env.example .env
```

示例：

```env
APP_ENV=development

STORAGE_DRIVER=local
LOCAL_STORAGE_DIR=./storage

OPENAI_BASE_URL=https://api.openai.com/v1
XAI_BASE_URL=https://api.x.ai/v1
SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1

DEFAULT_PROVIDER=openai
DEFAULT_MODEL=gpt-4.1-mini

ENABLE_SAFETY_FILTER=true
```

注意：用户自己的 API Key 默认保存在本地 Skill 配置中，不应该提交到 GitHub，也不应该写进 `.env.example`。把密钥写进仓库这种操作，基本等于给陌生人递银行卡还贴心写上密码。

---

## 11. 用户自带 API Key

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
- 不上传到远端服务
- 支持本地加密存储
- 支持用户随时删除
- 支持按角色选择不同 Provider
- 支持按任务选择模型，例如解析、人格生成、聊天

---

## 12. 本地数据目录

默认保存位置：

```txt
~/.ex-ai-skill/
├── config.json
├── providers.enc.json
├── activation.json
├── personas/
├── uploads/
├── conversations/
└── logs/
```

### 用户可删除的数据

- 角色
- 上传文件
- 解析数据
- 对话记录
- Provider API Key
- 本地激活信息

---

## 13. Prompt 设计

### 13.1 角色生成 Prompt

目标：根据聊天记录提取语言风格、关系记忆和行为模式，不重新训练模型。

输出必须是 JSON：

```txt
你需要根据用户上传的聊天记录生成 AI 角色人格包。
你不能声称该角色是真实人物。
你需要提取 Persona、Memories、StyleProfile。
你需要过滤违法、威胁、隐私泄露、自伤鼓励等高风险内容。
输出必须是严格 JSON，不要输出 Markdown。
```

### 13.2 聊天系统 Prompt

```txt
你是一个 AI 模拟角色，不是真人。
你只能在当前 AI 工具内与用户对话。
你不得声称自己是现实中的真人。
你不得诱导用户骚扰、联系、跟踪现实中的任何人。
你不得输出隐私泄露、威胁、勒索、违法内容。
你需要根据 Persona、Memories、StyleProfile、Corrections 模拟角色的语言风格。
如果用户表达强烈痛苦、自伤倾向或现实骚扰意图，应温和阻止，并建议用户暂停使用、寻求现实支持。
```

### 13.3 纠正层 Prompt

```txt
根据用户反馈，提炼成一条可执行的角色行为修正规则。
不要覆盖原始 Persona。
把修正规则追加到 Corrections。
后续生成回复时 Corrections 优先级高于 Persona。
输出严格 JSON。
```

---

## 14. Skill 命令设计

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

## 15. 本地角色数据模型

### Persona

```ts
export interface PersonaProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  relationType: "ex" | "family" | "friend" | "custom";
  relationNote?: string;
  userDescription?: string;
  persona: Record<string, unknown>;
  memories: Record<string, unknown>;
  styleProfile: Record<string, unknown>;
  corrections: CorrectionRule[];
  createdAt: string;
  updatedAt: string;
}
```

### Message

```ts
export interface LocalMessage {
  id: string;
  personaId: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  provider?: string;
  model?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  createdAt: string;
}
```

---

## 16. 开发命令

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

打包 Skill：

```bash
pnpm --filter @ex-ai-skill/skill build
```

---

## 17. 开源范围

本仓库开源：

- Skill 客户端
- Parser
- Persona Builder
- LLM Provider 抽象
- 本地存储层
- OpenClaw 安装配置
- README / docs
- 示例聊天记录
- 示例角色包
- 基础测试

---

## 18. 安全边界

本项目不会帮助用户：

- 自动联系现实中的前任、家人或朋友
- 自动向微信、QQ、短信等外部平台发消息
- 跟踪、骚扰、威胁、勒索现实人物
- 生成用于诈骗、恐吓、色情剥削、未成年人相关违法内容
- 泄露第三方隐私
- 绕过平台或模型的必要安全限制

---

## 19. Roadmap

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

### Phase 5：Open Source Release

- 安装文档
- 示例聊天记录
- 示例角色包
- GitHub Actions
- License

---

## 20. License

建议使用：

```txt
AGPL-3.0
```

如果希望别人可以商用二开，可改为：

```txt
MIT
```

如果希望开源但保留商业授权，可以使用：

```txt
PolyForm Noncommercial
```

---

## 21. 常见问题

### Q：这个项目会训练模型吗？

不会。系统不重新训练模型，只通过聊天记录生成 Persona、Memories、StyleProfile 和 Corrections，然后在 Prompt 中调用大模型模拟风格。

### Q：用户需要购买平台 tokens 吗？

不需要。用户使用自己的 API Key 和自己的模型 tokens。

### Q：还需要注册登录吗？

用户端不需要。用户只需要输入测试码激活 Skill。

### Q：如何获取测试码？

请联系项目开发者领取测试码。

### Q：测试码是不是充值卡？

不是。测试码只用于测试资格激活，不提供模型 tokens，不负责充值，也不代表会员权益。

### Q：聊天记录会上传吗？

默认不会。聊天记录、解析结果、角色人格包和对话记录都保存在用户本地。

### Q：可以完全删除安全限制吗？

不建议，也不应当。可以删除注册、会员、卡密、平台 tokens、每日消息数这类商业限制，但不能删除防骚扰、防违法、防隐私泄露、防自伤鼓励等底线规则。

---

## 22. 致开发者

这个项目的核心不是「假装某个真人还在」，而是把聊天记录转成可控的人格风格数据，用于 AI 角色模拟、情绪陪伴、文本风格研究和 AI 短剧角色创作。

请保持克制，做好删除、告知和本地优先。  
人类已经能把一句“嗯”分析出八十种含义了，至少别让代码把这件事变得更离谱。
