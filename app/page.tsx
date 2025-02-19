"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Home() {
  const [defaultModel, setDefaultModel] = useState("OpenAI 4o-mini");
  const [comparisonModel, setComparisonModel] = useState("Gemini");
  const [additionalModels, setAdditionalModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showResponses, setShowResponses] = useState(false);

  const models = ["OpenAI 4o-mini", "Gemini", "Gemma", "Llama", "DeepSeek"];
  const responses = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    Gemini: "This is a response from Gemini.",
    Gemma: "This is a response from Gemma.",
    Llama: "This is a response from Llama.",
    DeepSeek: "This is a response from DeepSeek.",
  };

  const handleAddModel = () => {
    setAdditionalModels([...additionalModels, ""]);
  };

  const handleModelChange = (index, value) => {
    const newModels = [...additionalModels];
    newModels[index] = value;
    setAdditionalModels(newModels);
  };

  const handleEnter = () => {
    setSelectedModels([defaultModel, comparisonModel, ...additionalModels]);
    setShowResponses(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-xl bg-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">LLM Evaluation Platform</h1>
        <div className="flex items-center gap-4 mb-6">
          <Select onValueChange={setDefaultModel} defaultValue={defaultModel}>
            <SelectTrigger className="w-1/4">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setComparisonModel} defaultValue={comparisonModel}>
            <SelectTrigger className="w-1/4">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {additionalModels.map((model, index) => (
            <Select
              key={index}
              onValueChange={(value) => handleModelChange(index, value)}
              defaultValue={model}
            >
              <SelectTrigger className="w-1/4">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={handleAddModel}
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
            onClick={handleEnter}
          >
            Enter
          </Button>
        </div>
      </Card>
      {showResponses && (
        <Card className="w-full max-w-2xl shadow-xl bg-white p-6 rounded-2xl mt-6">
          <h2 className="text-xl font-semibold mb-4">Responses</h2>
          {selectedModels.map(
            (model) =>
              responses[model] && (
                <CardContent key={model} className="p-3 mb-2 border rounded-lg">
                  <strong>{model}:</strong> {responses[model]}
                </CardContent>
              )
          )}
        </Card>
      )}
    </div>
  );
}
