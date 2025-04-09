import React from 'react'
import { Sender, XRequest } from '@ant-design/x'
import type { ThoughtChainItem } from '@ant-design/x'

import './css/sender.css'
import { Flex } from 'antd';

const BASE_URL = 'http://localhost:11434';
const PATH = '/api/generate';
const MODEL = 'llama3.2:latest';

const exampleRequest = XRequest({
    baseURL: BASE_URL + PATH,
    model: MODEL,
})

export const AISender: React.FC = () => {
    const [content, setContent] = React.useState('');
    const [status, setStatus] = React.useState<ThoughtChainItem['status']>()
    const [lines, setLines] = React.useState<Record<string, string>[]>([])
    const [messages, setMessages] = React.useState<[]>([])

    async function onRequest(text: string) {
        await exampleRequest.create(
          {
            prompt: text,
            // messages: [{ role: 'user', content: 'hello, who are u?' }],
            stream: false,
          },
          {
            onSuccess: (messages) => {
              setStatus('success');
              console.log('onSuccess', messages);
            },
            onError: (error) => {
              setStatus('error');
              console.error('onError', error);
            },
            onUpdate: (msg) => {
              setLines((pre) => [...pre, msg]);
              console.log('onUpdate', msg);
            },
          },
        );
      }

    return (
        <Flex vertical gap="middle">
            <Sender
                className='ai-sender'
                value={content}
                onChange={setContent}
                onSubmit={(nextContent) => {
                    console.log(nextContent)
                    onRequest(nextContent)
                    setContent('');
                }}
            />
        </Flex>
    )
}