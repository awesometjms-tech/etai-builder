# eTai-builder

AI-powered, no-code website builder: Generate, edit, and deploy advanced websites using text prompts with Puter.js instant multi-model AI (GPT-5 Nano, Claude, Llama, Grok, Deepseek, Mistral, and more!) and server-side Qwen/OpenAI.

---

## Instant Unlimited AI

- Blazing fast in-browser generation with Puter.js (no API key and no server needed!).
- Just select your favorite model in the UI and describe your website.
- Also supports secure/server-side (Qwen, OpenAI) as fallback or for pro users.

---

## Usage

1. Add `<script src="https://js.puter.com/v2/"></script>` to your custom `_document.js`.
2. Run `npm install` to install dependencies.
3. (Optional) Add API keys for server models in `.env.local` from `.env.example`.
4. Start: `npm run dev`
5. Visit `/dashboard`, create a project, select any model, and let the AI handle the rest!

---

## How it works

- Uses `puter.ai.generate` for all next-gen models in the browser.
- Uses server-side API endpoints for Qwen/OpenAI/Mistral/etc (as many as you want to add).
- Switch providers anytime.

---

## Supported Models (Dropdown)
- GPT-5 Nano
- GPT-4.5 Nano
- Nano Banana
- Mistral
- Llama
- Grok
- Claude
- Deepseek
- Qwen3-Coder (server/fallback)

---

## Easy Extensibility

Just update `src/utils/aiApiRouter.js` and the configuration to add more models!

---

## License

MIT