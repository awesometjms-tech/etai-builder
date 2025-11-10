// aiApiRouter.js: Multi-backend AI router for etai-builder, inspired by Puter.js unlimited AI tutorials
import { generateWithQwen } from './qwenApi';

// List all available Puter.js in-browser models
export const PUTER_MODELS = [
  { id: 'gpt-5-nano', label: 'GPT-5 Nano' },
  { id: 'gpt-4.5-nano', label: 'GPT-4.5 Nano' },
  { id: 'nano-banana', label: 'Nano Banana' },
  { id: 'mistral', label: 'Mistral' },
  { id: 'llama', label: 'Llama' },
  { id: 'grok', label: 'Grok' },
  { id: 'claude', label: 'Claude' },
  { id: 'deepseek', label: 'Deepseek' },
];

// This function works in the browser only (Puter.js must be loaded!)
export async function generateWithPuter(prompt, model) {
  if (typeof window !== "undefined" && window.puter && window.puter.ai && window.puter.ai.generate) {
    return await window.puter.ai.generate({ prompt, model, max_tokens: 2048 });
  } else {
    throw new Error('Puter.js not loaded. This method only runs in the browser.');
  }
}

// Server-side or secured providers (example: Qwen, add more as you like)
export const AI_ENGINES = [
  { id: 'qwen', label: 'Qwen3-Coder (Server)', fn: generateWithQwen, server: true },

  // Add all Puter.js models as selectable engines
  ...PUTER_MODELS.map(m => ({
    id: m.id,
    label: m.label + ' (In-Browser)',
    fn: prompt => generateWithPuter(prompt, m.id),
    server: false
  })),

  // You can add more server backends below as desired
  // { id: 'openai', label: 'OpenAI GPT-4.5 (Server)', fn: generateWithOpenAI, server: true },
];

export async function generateWithAI({ prompt, engine }) {
  const selected = AI_ENGINES.find(e => e.id === engine);
  if (!selected) throw new Error("Unknown engine: " + engine);
  return await selected.fn(prompt);
}