"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import ModelSelection from "@/components/ModelSelection";
import EvaluationMetrics from "@/components/EvaluationMetrics";
import ResponseDisplay from "@/components/ResponseDisplay";

export default function Home() {
  const initialModels: string[] = [
    "OpenAI 4o-mini",
    "Gemini",
    "Gemma",
    "Llama",
    "DeepSeek",
  ];

  const [defaultModel, setDefaultModel] = useState<string>("OpenAI 4o-mini");
  const [comparisonModel, setComparisonModel] = useState<string>("");
  const [additionalModels, setAdditionalModels] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showResponses, setShowResponses] = useState<boolean>(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [metricsOpen, setMetricsOpen] = useState<boolean>(true);

  const responses: { [key: string]: string } = {
    "OpenAI 4o-mini": "Response from OpenAI 4o-mini",
    Gemini: "Response from Gemini",
    Gemma: "Response from Gemma",
    Llama: "Response from Llama",
    DeepSeek: "Response from DeepSeek",
  };

  // The evaluationMetrics names as they appear in the checkboxes.
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

  const handleEnter = () => {
    setSelectedModels(
      [defaultModel, comparisonModel, ...additionalModels].filter(Boolean)
    );
    setShowResponses(true);
    setMetricsOpen(false);
  };

  return (
    <div className="h-screen flex w-full">
      <motion.div
        initial={{ flex: 1 }}
        animate={{ flex: showResponses ? 0.5 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="p-6 bg-gray-100 h-full flex flex-col"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Compare Models
        </h3>

        {/* Model Selection Component */}
        <ModelSelection
          initialModels={initialModels}
          defaultModel={defaultModel}
          comparisonModel={comparisonModel}
          additionalModels={additionalModels}
          setDefaultModel={setDefaultModel}
          setComparisonModel={setComparisonModel}
          setAdditionalModels={setAdditionalModels}
        />

        {/* Evaluation Metrics Component */}
        <EvaluationMetrics
          evaluationMetrics={evaluationMetrics}
          selectedMetrics={selectedMetrics}
          setSelectedMetrics={setSelectedMetrics}
          metricsOpen={metricsOpen}
          setMetricsOpen={setMetricsOpen}
        />

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

      {/* Divider & Responses Section */}
      {showResponses && (
        <ResponseDisplay
          selectedModels={selectedModels}
          responses={responses}
          selectedMetrics={selectedMetrics}
        />
      )}
    </div>
  );
}
