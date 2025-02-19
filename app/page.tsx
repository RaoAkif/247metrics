"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [models, setModels] = useState([
    "OpenAI 4o-mini",
    "Gemini",
    "Gemma",
    "Llama",
    "DeepSeek",
  ]);
  const [selectedModels, setSelectedModels] = useState([
    { id: 1, value: "OpenAI 4o-mini" },
    { id: 2, value: "Gemini" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showResponses, setShowResponses] = useState(false);

  const responses = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    Gemini: "This is a response from Gemini.",
    Gemma: "This is a response from Gemma.",
    Llama: "This is a response from Llama.",
    DeepSeek: "This is a response from DeepSeek.",
  };

  const addModelDropdown = () => {
    const newId = selectedModels.length + 1;
    setSelectedModels([
      ...selectedModels,
      { id: newId, value: models[0] },
    ]);
  };

  const updateModel = (id, newValue) => {
    setSelectedModels((prevModels) =>
      prevModels.map((model) =>
        model.id === id
          ? { ...model, value: newValue }
          : model
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-xl bg-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          LLM Evaluation Platform
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {selectedModels.map((model) => (
            <Select
              key={model.id}
              onValueChange={(value) =>
                updateModel(model.id, value)
              }
              defaultValue={model.value}
            >
              <SelectTrigger className="w-1/4 min-w-[150px]">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((modelName) => (
                  <SelectItem
                    key={modelName}
                    value={modelName}
                  >
                    {modelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <Button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={addModelDropdown}
          >
            Add Model
          </Button>
        </div>
        <Textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
          placeholder="Enter your text..."
        />
        <div className="flex justify-between mt-4">
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
          <h2 className="text-xl font-semibold mb-4">
            Responses
          </h2>
          {Object.entries(responses).map(
            ([model, response]) => (
              <CardContent
                key={model}
                className="p-3 mb-2 border rounded-lg"
              >
                <strong>{model}:</strong> {response}
              </CardContent>
            )
          )}
        </Card>
      )}
    </div>
  );
}
