import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ModelSelectionProps {
  initialModels: string[];
  defaultModel: string;
  comparisonModel: string;
  additionalModels: string[];
  setDefaultModel: (value: string) => void;
  setComparisonModel: (value: string) => void;
  setAdditionalModels: (models: string[]) => void;
}

export default function ModelSelection({
  initialModels,
  defaultModel,
  comparisonModel,
  additionalModels,
  setDefaultModel,
  setComparisonModel,
  setAdditionalModels,
}: ModelSelectionProps) {
  const getAvailableModels = (excludeModels: string[]) =>
    initialModels.filter((model) => !excludeModels.includes(model));

  const handleAddModel = () => {
    setAdditionalModels([...additionalModels, ""]);
  };

  const handleModelChange = (index: number, value: string) => {
    const updatedModels = [...additionalModels];
    updatedModels[index] = value;
    setAdditionalModels(updatedModels);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select onValueChange={setDefaultModel} defaultValue={defaultModel}>
        <SelectTrigger className="w-1/3 text-black">
          <SelectValue placeholder="Select a model">{defaultModel} (Default)</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {initialModels.map((model) => (
            <SelectItem key={model} value={model}>
              {model} {model === defaultModel ? "(Default)" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select key={comparisonModel} onValueChange={setComparisonModel} value={comparisonModel} disabled={!defaultModel}>
        <SelectTrigger className="w-1/3 text-black">
          <SelectValue placeholder="Select a model">{comparisonModel || "Select a model"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {getAvailableModels([defaultModel]).map((model) => (
            <SelectItem key={model} value={model}>{model}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {additionalModels.map((model, index) => (
        <Select key={index} onValueChange={(value) => handleModelChange(index, value)} value={model} disabled={!comparisonModel}>
          <SelectTrigger className="w-1/3 text-black">
            <SelectValue placeholder="Select a model">{model || "Select a model"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {getAvailableModels([defaultModel, comparisonModel, ...additionalModels]).map((availableModel) => (
              <SelectItem key={availableModel} value={availableModel}>{availableModel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      <Button
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        onClick={handleAddModel}
        disabled={!comparisonModel || additionalModels.length >= initialModels.length - 2}
      >
        Add Model
      </Button>
    </div>
  );
}
