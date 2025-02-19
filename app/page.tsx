"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Home() {
  const allModels = ["OpenAI 4o-mini", "Gemini", "Gemma", "Llama", "DeepSeek"];
  const responses = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    "Gemini": "This is a response from Gemini.",
    "Gemma": "This is a response from Gemma.",
    "Llama": "This is a response from Llama.",
    "DeepSeek": "This is a response from DeepSeek."
  };

  const [selectedModels, setSelectedModels] = useState(["OpenAI 4o-mini"]);
  const [inputValue, setInputValue] = useState("");
  const [showResponses, setShowResponses] = useState(false);
  const [submittedModels, setSubmittedModels] = useState([]);

  const availableModels = allModels.filter(model => !selectedModels.includes(model));

  const addModel = () => {
    if (availableModels.length > 0) {
      setSelectedModels([...selectedModels, availableModels[0]]);
    }
  };

  const updateModel = (index, newModel) => {
    const updatedModels = [...selectedModels];
    updatedModels[index] = newModel;
    setSelectedModels(updatedModels);
  };

  const handleEnter = () => {
    setSubmittedModels([...selectedModels]);
    setShowResponses(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex gap-6 w-full max-w-4xl">
        <Card className="w-1/2 shadow-xl bg-white p-6 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-6">LLM Evaluation Platform</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {selectedModels.map((model, index) => (
              <Select key={index} onValueChange={(value) => updateModel(index, value)} defaultValue={model}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {allModels.filter(m => !selectedModels.includes(m) || m === model).map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          <Button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700" onClick={addModel} disabled={availableModels.length === 0}>Add Model</Button>
          <Textarea 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 mt-4"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter your text..."
          />
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4" onClick={handleEnter}>Enter</Button>
        </Card>
        {showResponses && (
          <Card className="w-1/2 shadow-xl bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Responses</h2>
            {submittedModels.map((model) => (
              <CardContent key={model} className="p-3 mb-2 border rounded-lg">
                <strong>{model}:</strong> {responses[model]}
              </CardContent>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
