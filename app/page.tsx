"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [defaultModel, setDefaultModel] = useState<string>("OpenAI 4o-mini");
  const [comparisonModel, setComparisonModel] = useState<string>("Gemini");
  const [additionalModels, setAdditionalModels] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showResponses, setShowResponses] = useState<boolean>(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [metricsOpen, setMetricsOpen] = useState<boolean>(true); // Collapsible state

  const models: string[] = [
    "OpenAI 4o-mini",
    "Gemini",
    "Gemma",
    "Llama",
    "DeepSeek",
  ];

  const responses: Record<string, string> = {
    "OpenAI 4o-mini": "This is a response from OpenAI 4o-mini.",
    Gemini: "This is a response from Gemini.",
    Gemma: "This is a response from Gemma.",
    Llama: "This is a response from Llama.",
    DeepSeek: "This is a response from DeepSeek.",
  };

  const evaluationMetrics: string[] = [
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

  const handleModelChange = (index: number, value: string) => {
    const updatedModels = [...additionalModels];
    updatedModels[index] = value;
    setAdditionalModels(updatedModels);
  };

  const handleEnter = () => {
    setSelectedModels([defaultModel, comparisonModel, ...additionalModels]);
    setShowResponses(true);
    setMetricsOpen(false); // Collapse metrics on Enter
  };

  const toggleMetric = (metric: string) => {
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
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Compare Models
        </h3>

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
          <Select
            onValueChange={setComparisonModel}
            defaultValue={comparisonModel}
          >
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
            <Select
              key={index}
              onValueChange={(value) => handleModelChange(index, value)}
              defaultValue={model}
            >
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
          <Button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={handleAddModel}
          >
            Add Model
          </Button>
        </div>

        {/* Collapsible Evaluation Metrics Section */}
        <div className="mb-6 bg-gray-100 rounded-lg shadow">
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-whitesmoke rounded-t-lg"
            onClick={() => setMetricsOpen(!metricsOpen)}
          >
            <h4 className="text-md font-semibold">Select Evaluation Metrics</h4>
            {metricsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <motion.div
            initial={{ height: "auto" }}
            animate={{ height: metricsOpen ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4">
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
          </motion.div>
        </div>

        {/* Input Area */}
        <Textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 flex-grow"
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
      </motion.div>

      {/* Divider & Responses Section - Expanding */}
      {showResponses && (
        <motion.div
          initial={{ flex: 0 }}
          animate={{ flex: 0.5 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-full flex"
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "10px", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-400 h-full"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-gray-100 h-full w-full flex flex-col"
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Responses
            </h3>
            <div className="overflow-auto flex-grow">
              {selectedModels.map((model) => (
                <div key={model} className="p-3 mb-2 bg-gray-300 rounded-lg">
                  <strong>{model}:</strong> {responses[model] || "No response available."}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
