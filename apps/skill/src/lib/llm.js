export async function callOpenAICompatible(provider, messages, overrideModel) {
  const url = provider.baseUrl.replace(/\/$/, '') + '/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${provider.apiKey}`
    },
    body: JSON.stringify({
      model: overrideModel || provider.model,
      messages,
      temperature: 0.8
    })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`模型调用失败：${response.status} ${body.slice(0, 300)}`);
  }
  const data = await response.json();
  return {
    content: data.choices?.[0]?.message?.content || '',
    usage: data.usage || {}
  };
}

export function estimateTokens(text) {
  return Math.ceil(String(text).length / 4);
}
