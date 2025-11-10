import React, { useState } from "react";
import CodePreview from "./CodePreview";
import { AI_ENGINES } from "../utils/aiApiRouter";

const AIBuilderInterface = ({ projectId }) => {
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState(AI_ENGINES[0]?.id);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setOutput("");
    const selected = AI_ENGINES.find(e => e.id === engine);
    try {
      let code = "";
      if (selected.server) {
        // API route for server-side engines (Qwen, etc.)
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, engine }),
        });
        const data = await res.json();
        code = data.code || data.error || "";
      } else {
        // Direct in-browser AI (Puter.js)
        code = await selected.fn(prompt);
      }
      setOutput(code);
    } catch (err) {
      setOutput(err.message || "Generation failed.");
    }
    setLoading(false);
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-2">Describe your website/UI</h2>
      <textarea
        className="w-full p-2 rounded bg-gray-800 text-white"
        rows={4}
        placeholder="e.g. Create a modern SaaS landing like ceyloaero.com..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <div className="my-2 flex gap-4">
        <select value={engine} onChange={e => setEngine(e.target.value)}
          className="bg-gray-700 text-white px-2 rounded">
          {AI_ENGINES.map(e => (
            <option key={e.id} value={e.id}>{e.label}</option>
          ))}
        </select>
        <button className="bg-purple-600 px-4 py-2 rounded text-white font-bold"
          onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      <CodePreview code={output} />
    </div>
  );
};
export default AIBuilderInterface;