# Ai_Platform

## Overview

本项目基于 AI 模型构建，代码全部基于 AI 生成。

## 本地运行

- bun（推荐）

```
bun install
bun run dev
```

- node

```
npm install
npm run dev
```

- pnpm

```
pnpm install
pnpm run dev
```

## 开发模式
本项目开发，严格遵守`PROJECT_RULES.md`开发规则，大模型代码生产遵循`PROJECT_RULES.md`开发规则。

## 线上模型
推荐使用`VSCode`或`Trace` IDE最近版本，推荐使用 `GPT4.1`、 `GPT-4o`或`豆包`。如代码存在敏感信息，请及时针对模型排除。


## 本地模型
项目使用本地模型，优先使用 `ollma` 作为运行和服务管理；推荐使用`deepseek-r1:8b`、`qwen3:4b`模型作为项目依赖；`open-webui` 作为模型测试、开发和训练管理。

## 本地模型部署和运行
### 下载ollma

```
https://ollama.com/
```

### 下载和启动
```
ollama run deepseek-r1:7b
ollama run deepseek-r1:8b
ollama run llama3.3
ollama run qwen3:4b
```

### 接口请求

```curl
curl --location 'http://localhost:11434/api/generate' -d '{
    "model": "deepseek-r1:8b",
    "prompt": []
}'
```

### 模型调试（open-webui）
- podman 安装
```python
podman run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.nju.edu.cn/open-webui/open-webui:main
````





