# AI-Corder

## 本地AI 部署

### 下载ollma

```
https://ollama.com/
```

### 下载和启动
```
ollama run deepseek-r1:7b
ollama run deepseek-r1:8b
ollama run llama3.3
```

### 接口请求

```curl
curl --location 'http://localhost:11434/api/generate' -d '{
    "model": "deepseek-r1:8b",
    "prompt": []
}'
```

## open-webui

- podman 安装
```python
podman run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.nju.edu.cn/open-webui/open-webui:main
````





