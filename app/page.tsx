"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Home() {
  const [dropdowns, setDropdowns] = useState(["defaultModel", "comparisonModel"]);
  const [models, setModels] = useState({
    defaultModel: "OpenAI 4o-mini",
    comparisonModel: "Gemini",
  });
  const modelOptions = ["OpenAI 4o-mini", "Gemini", "Gemma", "Llama", "DeepSeek"];
  const responses = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    Gemini: "This is a response from Gemini.",
    Gemma: "This is a response from Gemma.",
    Llama: "This is a response from Llama.",
    DeepSeek: "This is a response from DeepSeek.",
  };
  const [inputValue, setInputValue] = useState("");
  const [showResponses, setShowResponses] = useState(false);

  const addDropdown = () => {
    const newDropdown = `model${dropdowns.length + 1}`;
    setDropdowns([...dropdowns, newDropdown]);
    setModels({ ...models, [newDropdown]: modelOptions[0] });
  };

  const handleModelChange = (key, value) => {
    setModels({ ...models, [key]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-xl bg-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">LLM Evaluation Platform</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {dropdowns.map((dropdown) => (
            <div key={dropdown} className="flex-1 min-w-[30%]">
              <Select
                onValueChange={(value) => handleModelChange(dropdown, value)}
                defaultValue={models[dropdown]}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 self-center"
            onClick={addDropdown}
          >
            Add Model
          </Button>
        </div>
        <Textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your text..."
        />
        <div className="flex justify-end mt-4">
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setShowResponses(true)}
          >
            Enter
          </Button>
        </div>
      </Card>
      {showResponses && (
        <Card className="w-full max-w-2xl shadow-xl bg-white p-6 rounded-2xl mt-6">
          <h2 className="text-xl font-semibold mb-4">Responses</h2>
          {Object.entries(responses).map(([model, response]) => (
            <CardContent key={model} className="p-3 mb-2 border rounded-lg">
              <strong>{model}:</strong> {response}
            </CardContent>
          ))}
        </Card>
      )}
    </div>
  );
}
