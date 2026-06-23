# OpenClaw 安装说明

## 安装依赖

```bash
git clone https://github.com/weeduon/ex-ai-skill.git
cd ex-ai-skill
npm install
```

## 激活

测试码请联系开发者领取。

```bash
echo '{"command":"activate","args":{"code":"YOUR_TEST_CODE"}}' | node apps/skill/src/index.js
```

## 配置模型

```bash
echo '{"command":"configure_provider","args":{"name":"openai","baseUrl":"https://api.openai.com/v1","apiKey":"YOUR_API_KEY","model":"gpt-4.1-mini"}}' | node apps/skill/src/index.js
```

## 创建角色

```bash
echo '{"command":"create_persona","args":{"name":"测试角色","relationType":"custom","userDescription":"回复简短，语气克制"}}' | node apps/skill/src/index.js
```

## 上传聊天记录

```bash
echo '{"command":"upload_chat_record","args":{"personaId":"persona_xxx","filePath":"examples/sample-chat.txt","sourceType":"other"}}' | node apps/skill/src/index.js
```

## 生成人格包

```bash
echo '{"command":"generate_persona","args":{"personaId":"persona_xxx"}}' | node apps/skill/src/index.js
```

## 对话

```bash
echo '{"command":"chat","args":{"personaId":"persona_xxx","message":"今天在吗"}}' | node apps/skill/src/index.js
```
