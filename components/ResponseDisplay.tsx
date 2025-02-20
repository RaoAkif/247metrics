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
  selectedModels: string[];
  responses: { [key: string]: string };
  selectedMetrics: string[];
}

export default function ResponseDisplay({ selectedModels, responses, selectedMetrics }: ResponseDisplayProps) {
  // Map the evaluation metric names (from Home) to the internal ones used below.
  const metricMapping: { [key: string]: string } = {
    "Accuracy of Responses": "Accuracy & Relevance (Factuality)",
    "Response Time (Latency)": "Response Speed & Efficiency",
    "Sentiment & Tone Alignment": "Sentiment & Tone Consistency",
    "Context Retention (Multi-turn Conversations)": "Context Retention & Multi-turn Coherence",
    "Hallucination Detection": "Hallucination Detection",
    "Intent Recognition & Routing": "Intent Recognition & Routing",
    "Personalization & Customer Recognition": "Personalization & Customer Recognition",
    "Compliance & Security": "Compliance & Security",
    "Escalation Handling": "Escalation Handling",
    "Language & Accent Understanding": "Language & Accent Understanding",
    "Handling Interruptions & Corrections": "Handling Interruptions & Corrections",
    "Handling Noisy Input (Speech-to-Text Evaluation)": "Handling Noisy Input (ASR Evaluation)",
    "Query Complexity Handling": "Query Complexity Handling",
    "Emotional Intelligence & Empathy": "Emotional Intelligence & Empathy",
    "Conversational Flow & Engagement": "Conversational Flow & Engagement"
  };

  const allMetrics = [
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

  // Convert selected evaluation metrics (from checkboxes) into our internal names.
  const internalSelectedMetrics = selectedMetrics
    .map((m) => metricMapping[m])
    .filter(Boolean);
  const metricsToDisplay = allMetrics.filter((metric) =>
    internalSelectedMetrics.includes(metric)
  );

  // Helper: generate a dummy score based on a category and model name.
  const getDummyScore = (category: string, model: string) => {
    const base = model.charCodeAt(0);
    const catFactor = category.length;
    return Math.floor(((base + catFactor) % 50) + 50); // yields a value between 50 and 99
  };

  // Colors for chart elements
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F"];

  // Render a visualization based on the metric name.
  function renderChart(metricName: string) {
    switch (metricName) {
      case "Accuracy & Relevance (Factuality)": {
        // Radar Chart: comparing three sub-categories.
        const radarCategories = ["Semantic Similarity", "Exact Match", "Knowledge Score"];
        const radarData = radarCategories.map((cat) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataPoint: any = { metric: cat };
          selectedModels.forEach((model) => {
            dataPoint[model] = getDummyScore(cat, model);
          });
          return dataPoint;
        });
        return (
          <RadarChart outerRadius={60} width={300} height={250} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {selectedModels.map((model, index) => (
              <Radar
                key={model}
                name={model}
                dataKey={model}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
            <Tooltip />
          </RadarChart>
        );
      }
      case "Response Speed & Efficiency": {
        // Line Chart for latency across multiple prompts.
        const prompts = ["1", "2", "3"];
        const lineData = prompts.map((prompt) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dataPoint: any = { prompt };
          selectedModels.forEach((model) => {
            dataPoint[model] = getDummyScore("Latency", model) + parseInt(prompt) * 2;
          });
          return dataPoint;
        });
        return (
          <LineChart width={300} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="prompt" />
            <YAxis domain={[0, 150]} />
            <Tooltip />
            {selectedModels.map((model, index) => (
              <Line key={model} type="monotone" dataKey={model} stroke={colors[index % colors.length]} />
            ))}
          </LineChart>
        );
      }
      case "Sentiment & Tone Consistency": {
        // Sentiment Polarity Heatmap represented as a table.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">Sentiment (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedModels.map((model) => (
                <tr key={model}>
                  <td className="border px-2 py-1">{model}</td>
                  <td className="border px-2 py-1">{getDummyScore("Sentiment", model)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Context Retention & Multi-turn Coherence": {
        // Heatmap as a table showing context retention.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">Retention (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedModels.map((model) => (
                <tr key={model}>
                  <td className="border px-2 py-1">{model}</td>
                  <td className="border px-2 py-1">{getDummyScore("Context", model)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Hallucination Detection": {
        // Error Rate Bar Chart.
        const errorData = selectedModels.map((model) => ({
          name: model,
          errorRate: getDummyScore("Error", model)
        }));
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
        // Confusion Matrix represented as a table with two dummy intents.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Intent</th>
                {selectedModels.map((model) => (
                  <th key={model} className="border px-2 py-1">{model}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {["Intent 1", "Intent 2"].map((intent) => (
                <tr key={intent}>
                  <td className="border px-2 py-1">{intent}</td>
                  {selectedModels.map((model) => (
                    <td key={model} className="border px-2 py-1">{getDummyScore(intent, model)}%</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Personalization & Customer Recognition": {
        // Personalization accuracy as a heatmap table.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedModels.map((model) => (
                <tr key={model}>
                  <td className="border px-2 py-1">{model}</td>
                  <td className="border px-2 py-1">{getDummyScore("Personalization", model)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Compliance & Security": {
        // Pie Chart for PII leakage.
        const pieData = selectedModels.map((model) => ({
          name: model,
          value: getDummyScore("PII", model)
        }));
        return (
          <PieChart width={300} height={250}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      }
      case "Escalation Handling": {
        // Stacked Bar Chart for escalation handling.
        const escalationData = selectedModels.map((model) => ({
          name: model,
          correct: getDummyScore("EscalationCorrect", model),
          false: getDummyScore("EscalationFalse", model)
        }));
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
        // WER Heatmap as a table.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">WER (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedModels.map((model) => (
                <tr key={model}>
                  <td className="border px-2 py-1">{model}</td>
                  <td className="border px-2 py-1">{getDummyScore("WER", model)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Handling Interruptions & Corrections": {
        // Stacked Bar Chart for correction success rate.
        const correctionData = selectedModels.map((model) => ({
          name: model,
          success: getDummyScore("InterruptSuccess", model),
          failure: getDummyScore("InterruptFailure", model)
        }));
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
        // WER Table for different noise levels.
        const noiseLevels = ["Low", "High"];
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Noise Level</th>
                {selectedModels.map((model) => (
                  <th key={model} className="border px-2 py-1">{model} WER</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {noiseLevels.map((level) => (
                <tr key={level}>
                  <td className="border px-2 py-1">{level}</td>
                  {selectedModels.map((model) => (
                    <td key={model} className="border px-2 py-1">
                      {getDummyScore(`ASR ${level}`, model)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Query Complexity Handling": {
        // Scatter Plot for performance on simple vs. complex queries.
        const scatterData: { complexity: number }[] = [
          { complexity: 1 },
          { complexity: 2 },
          { complexity: 3 }
        ];
        return (
          <ScatterChart width={300} height={250}>
            <CartesianGrid />
            <XAxis type="number" dataKey="complexity" name="Complexity" />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {selectedModels.map((model, index) => {
              const data = scatterData.map((point) => ({
                ...point,
                value: getDummyScore("Complexity", model) + point.complexity * 2
              }));
              return (
                <Scatter key={model} name={model} data={data} fill={colors[index % colors.length]} />
              );
            })}
          </ScatterChart>
        );
      }
      case "Emotional Intelligence & Empathy": {
        // Sentiment Heatmap for empathy as a table.
        return (
          <table className="min-w-full text-sm border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">Empathy (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedModels.map((model) => (
                <tr key={model}>
                  <td className="border px-2 py-1">{model}</td>
                  <td className="border px-2 py-1">{getDummyScore("Empathy", model)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
      case "Conversational Flow & Engagement": {
        // Bar Chart for coherence scores.
        const engagementData = selectedModels.map((model) => ({
          name: model,
          coherence: getDummyScore("Coherence", model)
        }));
        return (
          <BarChart width={300} height={250} data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="coherence" fill={colors[0]} />
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
      {/* Vertical Divider */}
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
          <div className="grid grid-cols-1 gap-8">
            {metricsToDisplay.length > 0 ? (
              metricsToDisplay.map((metric) => (
                <div key={metric} className="p-4 bg-white rounded shadow flex flex-col items-center">
                  <h4 className="font-bold mb-2">{metric}</h4>
                  {renderChart(metric)}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No evaluation metrics selected.</div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
