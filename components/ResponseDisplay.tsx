import { motion } from "framer-motion";

interface ResponseDisplayProps {
  selectedModels: string[]; // can be ["Model A", "Model B"]
  responses: { [key: string]: string };
}

export default function ResponseDisplay({ selectedModels, responses }: ResponseDisplayProps) {
  // Dummy data for 15 metrics
  const metrics = [
    { name: "Accuracy & Relevance (Factuality)", modelA: 85, modelB: 78 },
    { name: "Response Speed & Efficiency", modelA: 92, modelB: 88 },
    { name: "Sentiment & Tone Consistency", modelA: 75, modelB: 80 },
    { name: "Context Retention & Multi-turn Coherence", modelA: 80, modelB: 76 },
    { name: "Hallucination Detection", modelA: 90, modelB: 85 },
    { name: "Intent Recognition & Routing", modelA: 88, modelB: 82 },
    { name: "Personalization & Customer Recognition", modelA: 80, modelB: 75 },
    { name: "Compliance & Security", modelA: 95, modelB: 90 },
    { name: "Escalation Handling", modelA: 70, modelB: 65 },
    { name: "Language & Accent Understanding", modelA: 85, modelB: 80 },
    { name: "Handling Interruptions & Corrections", modelA: 75, modelB: 70 },
    { name: "Handling Noisy Input (ASR Evaluation)", modelA: 80, modelB: 78 },
    { name: "Query Complexity Handling", modelA: 88, modelB: 85 },
    { name: "Emotional Intelligence & Empathy", modelA: 82, modelB: 79 },
    { name: "Conversational Flow & Engagement", modelA: 90, modelB: 87 },
  ];

  return (
    <motion.div
      initial={{ flex: 0 }}
      animate={{ flex: 0.5 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="h-full flex"
    >
      {/* Left vertical divider */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "10px", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-400 h-full"
      />
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-6 bg-gray-100 h-full w-full flex flex-col"
      >
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Model Comparison Metrics
        </h3>
        <div className="overflow-auto flex-grow">
          {/* Using a one-column grid to display each metric on its own row */}
          <div className="grid grid-cols-1 gap-4">
            {metrics.map((metric) => (
              <div key={metric.name} className="p-4 bg-white rounded shadow">
                <h4 className="font-bold mb-2">{metric.name}</h4>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="text-sm mb-1">Model A: {metric.modelA}%</div>
                    <div className="w-full bg-gray-200 h-4 rounded">
                      <div
                        className="bg-blue-500 h-4 rounded"
                        style={{ width: `${metric.modelA}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">Model B: {metric.modelB}%</div>
                    <div className="w-full bg-gray-200 h-4 rounded">
                      <div
                        className="bg-green-500 h-4 rounded"
                        style={{ width: `${metric.modelB}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
