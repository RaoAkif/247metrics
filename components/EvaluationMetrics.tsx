"use client";
// components/EvaluationMetrics.tsx
import { useModelContext } from "@/context/ModelContext";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const evaluationMetrics = [
  "Accuracy of Responses",
  "Response Time (Latency)",
  "Sentiment & Tone Alignment",
  "Context Retention",
  "Hallucination Detection",
];

export default function EvaluationMetrics() {
  const { selectedMetrics, setSelectedMetrics } = useModelContext() as { selectedMetrics: string[], setSelectedMetrics: React.Dispatch<React.SetStateAction<string[]>> };
  const [metricsOpen, setMetricsOpen] = useState(true);

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prevMetrics: string[]) =>
      prevMetrics.includes(metric)
        ? prevMetrics.filter((m: string) => m !== metric)
        : [...prevMetrics, metric]
    );
  };

  return (
    <div className="mb-6 bg-gray-100 rounded-lg shadow">
      <div onClick={() => setMetricsOpen(!metricsOpen)} className="flex justify-between items-center p-4 cursor-pointer bg-whitesmoke">
        <h4 className="text-md font-semibold">Select Evaluation Metrics</h4>
        {metricsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <motion.div animate={{ height: metricsOpen ? "auto" : 0 }} className="overflow-hidden">
        <div className="grid grid-cols-2 gap-2 p-4">
          {evaluationMetrics.map((metric) => (
            <label key={metric} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric)}
                onChange={() => toggleMetric(metric)} // ✅ Call function directly
              />
              <span className="text-sm">{metric}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
