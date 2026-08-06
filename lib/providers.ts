export type Provider = {
  name: string
  /** Simple Icons slug — set for providers with a verified simple-icon */
  slug?: string
  /** Direct favicon URL used as fallback when no simple-icon exists */
  favicon?: string
}

export const PROVIDERS: Provider[] = [
  { name: 'OpenCode Zen', slug: 'opencode', favicon: 'https://opencode.ai/favicon.ico' },
  { name: 'Anthropic', slug: 'anthropic', favicon: 'https://www.anthropic.com/favicon.ico' },
  { name: 'GitHub Copilot', slug: 'github', favicon: 'https://github.com/favicon.ico' },
  { name: 'OpenAI', favicon: 'https://openai.com/favicon.ico' },
  { name: 'Google', slug: 'google', favicon: 'https://www.google.com/favicon.ico' },
  { name: 'OpenRouter', slug: 'openrouter', favicon: 'https://openrouter.ai/favicon.ico' },
  { name: 'Vercel AI Gateway', slug: 'vercel', favicon: 'https://vercel.com/favicon.ico' },
  { name: '302.AI', favicon: 'https://302.ai/favicon.ico' },
  { name: 'Abacus', favicon: 'https://abacus.ai/favicon.ico' },
  { name: 'AI-ROUTER', favicon: 'https://ai-router.dev/favicon.ico' },
  { name: 'DeepSeek', slug: 'deepseek', favicon: 'https://www.deepseek.com/favicon.ico' },
  { name: 'Groq', slug: 'groq', favicon: 'https://groq.com/favicon.ico' },
  { name: 'Mistral', slug: 'mistral', favicon: 'https://mistral.ai/favicon.ico' },
  { name: 'Meta', slug: 'meta', favicon: 'https://www.meta.com/favicon.ico' },
  { name: 'Nvidia', slug: 'nvidia', favicon: 'https://www.nvidia.com/favicon.ico' },
  { name: 'Perplexity', slug: 'perplexity', favicon: 'https://www.perplexity.ai/favicon.ico' },
  {
    name: 'Together AI',
    slug: 'together',
    favicon:
      'https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/699e382b218f39bfa0a115d9_favicon.png',
  },
  { name: 'xAI', slug: 'x', favicon: 'https://x.ai/favicon.ico' },
  { name: 'Azure', slug: 'microsoftazure', favicon: 'https://azure.microsoft.com/favicon.ico' },
  { name: 'AWS Bedrock', slug: 'amazonwebservices', favicon: 'https://aws.amazon.com/favicon.ico' },
  { name: 'Cloudflare AI', slug: 'cloudflare', favicon: 'https://www.cloudflare.com/favicon.ico' },
  { name: 'Fireworks AI', slug: 'fireworks', favicon: 'https://fireworks.ai/favicon.ico' },
  { name: 'Hugging Face', slug: 'huggingface', favicon: 'https://huggingface.co/favicon.ico' },
  { name: 'Ollama', slug: 'ollama', favicon: 'https://ollama.com/favicon.ico' },
  { name: 'LMStudio', slug: 'lmstudio', favicon: 'https://lmstudio.ai/favicon.ico' },
]