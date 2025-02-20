"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function Home() {
  const [defaultModel, setDefaultModel] = useState("OpenAI 4o-mini");
  const [comparisonModel, setComparisonModel] = useState("Gemini");
  const [additionalModels, setAdditionalModels] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showResponses, setShowResponses] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);

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
    const updatedModels = [...additionalModels];
    updatedModels[index] = value;
    setAdditionalModels(updatedModels);
  };

  const handleEnter = () => {
    setSelectedModels([defaultModel, comparisonModel, ...additionalModels]);
    setShowResponses(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="flex w-full max-w-5xl gap-0 mt-20">
        {/* Compare Models Section */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: showResponses ? "calc(50% - 5px)" : "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="p-6 bg-gray-100"
        >
          <h3 className="text-2xl font-semibold mb-4 text-center">Compare Models</h3>
          <div className="flex flex-wrap gap-4 mb-6">
            <Select onValueChange={setDefaultModel} defaultValue={defaultModel}>
              <SelectTrigger className="w-1/3">
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
              <SelectTrigger className="w-1/3">
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
              <Select key={index} onValueChange={(value) => handleModelChange(index, value)} defaultValue={model}>
                <SelectTrigger className="w-1/3">
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
            <Button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700" onClick={handleAddModel}>
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
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleEnter}>
              Enter
            </Button>
          </div>
        </motion.div>

        {/* Divider & Responses Section - Move in together */}
        {showResponses && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex"
          >
            {/* Divider (slides in together with Responses) */}
            <div className="w-[10px] bg-gray-400" />

            {/* Responses Section */}
            <div className="p-6 bg-gray-200 w-[calc(50%-5px)]">
              <h3 className="text-2xl font-semibold mb-4 text-center">Responses</h3>
              {selectedModels.map((model) => (
                <div key={model} className="p-3 mb-2 bg-gray-300 rounded-lg">
                  <strong>{model}:</strong> {responses[model] || "No response available."}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
