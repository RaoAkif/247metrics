import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from "recharts";

interface ResponseDisplayProps {
  selectedModels: string[]; // e.g. ["Model A", "Model B"]
  responses?: { [key: string]: string };
}

export default function ResponseDisplay({ selectedModels }: ResponseDisplayProps) {
  // List of 15 metrics (names must match those in our renderChart switch cases)
  const metrics = [
    "Accuracy & Relevance (Factuality)",
    "Response Speed & Efficiency",
    "Sentiment & Tone Consistency",
    "Context Retention & Multi-turn Coherence",
    "Hallucination Detection",
    "Intent Recognition & Routing",
    "Personalization & Customer Recognition",
    "Compliance & Security",
    "Escalation Handling",
    "Language & Accent Understanding",
    "Handling Interruptions & Corrections",
    "Handling Noisy Input (ASR Evaluation)",
    "Query Complexity Handling",
    "Emotional Intelligence & Empathy",
    "Conversational Flow & Engagement"
  ];

  // Render a chart for a given metric based on its best visualization type.
  function renderChart(metricName: string) {
    switch (metricName) {
      case "Accuracy & Relevance (Factuality)": {
        // Dummy radar chart for multi-metric comparison (Semantic Similarity, Exact Match, Knowledge Score)
        const radarData = [
          { metric: "Semantic Similarity", ModelA: 80, ModelB: 75 },
          { metric: "Exact Match", ModelA: 85, ModelB: 80 },
          { metric: "Knowledge Score", ModelA: 90, ModelB: 85 }
        ];
        return (
          <RadarChart outerRadius={60} width={300} height={250} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Model A" dataKey="ModelA" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Model B" dataKey="ModelB" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        );
      }
      case "Response Speed & Efficiency": {
        // Dummy line chart for latency over multiple prompts
        const lineData = [
          { prompt: "1", ModelA: 100, ModelB: 110 },
          { prompt: "2", ModelA: 95, ModelB: 105 },
          { prompt: "3", ModelA: 98, ModelB: 108 }
        ];
        return (
          <LineChart width={300} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="prompt" />
            <YAxis domain={[0, 150]} />
            <Tooltip />
            <Line type="monotone" dataKey="ModelA" stroke="#8884d8" />
            <Line type="monotone" dataKey="ModelB" stroke="#82ca9d" />
          </LineChart>
        );
      }
      case "Sentiment & Tone Consistency": {
        // Dummy sentiment polarity heatmap
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-green-200 to-red-200">
            Sentiment Polarity Heatmap
          </div>
        );
      }
      case "Context Retention & Multi-turn Coherence": {
        // Dummy heatmap for context retention
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
            Context Retention Heatmap
          </div>
        );
      }
      case "Hallucination Detection": {
        // Dummy error rate bar chart
        const errorData = [
          { name: "Model A", errorRate: 5 },
          { name: "Model B", errorRate: 8 }
        ];
        return (
          <BarChart width={300} height={250} data={errorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip />
            <Bar dataKey="errorRate" fill="#ff7300" />
          </BarChart>
        );
      }
      case "Intent Recognition & Routing": {
        // Dummy confusion matrix rendered as a simple table
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Intent</th>
                <th className="border px-2 py-1">Model A</th>
                <th className="border px-2 py-1">Model B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Intent 1</td>
                <td className="border px-2 py-1">80%</td>
                <td className="border px-2 py-1">75%</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Intent 2</td>
                <td className="border px-2 py-1">85%</td>
                <td className="border px-2 py-1">80%</td>
              </tr>
            </tbody>
          </table>
        );
      }
      case "Personalization & Customer Recognition": {
        // Dummy heatmap for personalization accuracy
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-yellow-200 to-red-200">
            Personalization Accuracy Heatmap
          </div>
        );
      }
      case "Compliance & Security": {
        // Dummy pie chart for PII leakage percentage
        const pieData = [
          { name: "Model A", value: 3 },
          { name: "Model B", value: 5 }
        ];
        const COLORS = ["#0088FE", "#00C49F"];
        return (
          <PieChart width={300} height={250}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      }
      case "Escalation Handling": {
        // Dummy stacked bar chart for escalation handling (correct vs. false escalations)
        const escalationData = [
          { name: "Model A", correct: 80, false: 20 },
          { name: "Model B", correct: 75, false: 25 }
        ];
        return (
          <BarChart width={300} height={250} data={escalationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="correct" stackId="a" fill="#82ca9d" />
            <Bar dataKey="false" stackId="a" fill="#ff7300" />
          </BarChart>
        );
      }
      case "Language & Accent Understanding": {
        // Dummy WER heatmap
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-purple-200 to-pink-200">
            WER Heatmap
          </div>
        );
      }
      case "Handling Interruptions & Corrections": {
        // Dummy stacked bar chart for correction success rate
        const correctionData = [
          { name: "Model A", success: 85, failure: 15 },
          { name: "Model B", success: 80, failure: 20 }
        ];
        return (
          <BarChart width={300} height={250} data={correctionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="success" stackId="a" fill="#82ca9d" />
            <Bar dataKey="failure" stackId="a" fill="#ff7300" />
          </BarChart>
        );
      }
      case "Handling Noisy Input (ASR Evaluation)": {
        // Dummy WER table rendered as a simple table
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Noise Level</th>
                <th className="border px-2 py-1">Model A WER</th>
                <th className="border px-2 py-1">Model B WER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Low</td>
                <td className="border px-2 py-1">10%</td>
                <td className="border px-2 py-1">12%</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">High</td>
                <td className="border px-2 py-1">20%</td>
                <td className="border px-2 py-1">25%</td>
              </tr>
            </tbody>
          </table>
        );
      }
      case "Query Complexity Handling": {
        // Dummy scatter plot for performance on simple vs. complex queries
        const scatterData = [
          { complexity: 1, ModelA: 90, ModelB: 85 },
          { complexity: 2, ModelA: 80, ModelB: 75 },
          { complexity: 3, ModelA: 70, ModelB: 65 }
        ];
        return (
          <ScatterChart width={300} height={250}>
            <CartesianGrid />
            <XAxis type="number" dataKey="complexity" name="Complexity" />
            <YAxis type="number" dataKey="ModelA" name="ModelA" domain={[0, 100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Model A" data={scatterData} fill="#8884d8" />
            <Scatter name="Model B" data={scatterData} fill="#82ca9d" />
          </ScatterChart>
        );
      }
      case "Emotional Intelligence & Empathy": {
        // Dummy sentiment heatmap for empathy feedback
        return (
          <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-200">
            Sentiment Heatmap
          </div>
        );
      }
      case "Conversational Flow & Engagement": {
        // Dummy bar chart for coherence scores
        const engagementData = [
          { name: "Model A", coherence: 90 },
          { name: "Model B", coherence: 85 }
        ];
        return (
          <BarChart width={300} height={250} data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="coherence" fill="#8884d8" />
          </BarChart>
        );
      }
      default:
        return <div>No chart available.</div>;
    }
  }

  return (
    <motion.div
      initial={{ flex: 0 }}
      animate={{ flex: 0.5 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="h-full flex"
    >
      {/* Vertical divider remains unchanged */}
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
        <h3 className="text-2xl font-semibold mb-4 text-center">Model Comparison Metrics</h3>
        <div className="overflow-auto flex-grow">
          {/* One-column grid: each metric (with its chart) appears on its own row */}
          <div className="grid grid-cols-1 gap-8">
            {metrics.map((metric) => (
              <div key={metric} className="p-4 bg-white rounded shadow flex flex-col items-center">
                <h4 className="font-bold mb-2">{metric}</h4>
                {renderChart(metric)}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
