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
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const models = ["OpenAI 4o-mini", "Gemini", "Gemma", "Llama", "DeepSeek"];
  const responses = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    Gemini: "This is a response from Gemini.",
    Gemma: "This is a response from Gemma.",
    Llama: "This is a response from Llama.",
    DeepSeek: "This is a response from DeepSeek.",
  };

  const evaluationMetrics = [
    "Accuracy of Responses",
    "Response Time (Latency)",
    "Sentiment & Tone Alignment",
    "Context Retention (Multi-turn Conversations)",
    "Hallucination Detection",
    "Intent Recognition & Routing",
    "Personalization & Customer Recognition",
    "Compliance & Security",
    "Escalation Handling",
    "Language & Accent Understanding",
    "Handling Interruptions & Corrections",
    "Handling Noisy Input (Speech-to-Text Evaluation)",
    "Query Complexity Handling",
    "Emotional Intelligence & Empathy",
    "Conversational Flow & Engagement",
  ];

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

  const toggleMetric = (metric) => {
    setSelectedMetrics((prevMetrics) =>
      prevMetrics.includes(metric)
        ? prevMetrics.filter((m) => m !== metric)
        : [...prevMetrics, metric]
    );
  };

  return (
    <div className="h-screen flex w-full">
      {/* Compare Models Section - Shrinking */}
      <motion.div
        initial={{ flex: 1 }}
        animate={{ flex: showResponses ? 0.5 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="p-6 bg-gray-100 h-full flex flex-col"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">Compare Models</h3>

        {/* Model Selection */}
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

        {/* Evaluation Metrics (Checkboxes) */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-2">Select Evaluation Metrics:</h4>
          <div className="grid grid-cols-2 gap-2">
            {evaluationMetrics.map((metric) => (
              <label key={metric} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  checked={selectedMetrics.includes(metric)}
                  onChange={() => toggleMetric(metric)}
                />
                <span className="text-sm">{metric}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <Textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 flex-grow"
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

      {/* Divider & Responses Section - Expanding */}
      {showResponses && (
        <motion.div
          initial={{ flex: 0 }}
          animate={{ flex: 0.5 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full flex"
        >
          {/* Smooth Divider Transition */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "10px", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="bg-gray-400 h-full"
          />

          {/* Responses Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="p-6 bg-gray-200 h-full w-full flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">Responses</h3>
            <div className="overflow-auto flex-grow">
              {selectedModels.map((model) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-3 mb-2 bg-gray-300 rounded-lg"
                >
                  <strong>{model}:</strong> {responses[model] || "No response available."}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
