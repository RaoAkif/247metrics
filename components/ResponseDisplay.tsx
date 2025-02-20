import { motion } from "framer-motion";

interface ResponseDisplayProps {
  selectedModels: string[];
  responses: { [key: string]: string };
}

export default function ResponseDisplay({ selectedModels, responses }: ResponseDisplayProps) {
  return (
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
        <h3 className="text-2xl font-semibold mb-4 text-center">Responses</h3>
        <div className="overflow-auto flex-grow">
          {selectedModels.map((model) => (
            <div key={model} className="p-3 mb-2 bg-gray-300 rounded-lg">
              <strong>{model}:</strong> {responses[model] || "No response available."}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
