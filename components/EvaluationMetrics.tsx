import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EvaluationMetricsProps {
  evaluationMetrics: string[];
  selectedMetrics: string[];
  setSelectedMetrics: (metrics: string[]) => void;
  metricsOpen: boolean;
  setMetricsOpen: (open: boolean) => void;
}

export default function EvaluationMetrics({
  evaluationMetrics,
  selectedMetrics,
  setSelectedMetrics,
  metricsOpen,
  setMetricsOpen,
}: EvaluationMetricsProps) {
  const toggleMetric = (metric: string) => {
    setSelectedMetrics(
      selectedMetrics.includes(metric)
        ? selectedMetrics.filter((m: string) => m !== metric)
        : [...selectedMetrics, metric]
    );
  };

  return (
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
  );
}
