// components/InputArea.tsx
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useModelContext } from "@/context/ModelContext";

export default function InputArea() {
  const {
    inputValue,
    setInputValue,
    setSelectedModels,
    defaultModel,
    comparisonModel,
    additionalModels,
    setShowResponses, // ✅ Add this
  } = useModelContext();

  const handleEnter = () => {
    setSelectedModels([defaultModel, comparisonModel, ...additionalModels].filter(Boolean));
    setShowResponses(true); // ✅ Now correctly uses context
  };

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter your text..."
      />
      <div className="flex justify-end">
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleEnter}
          disabled={!inputValue.trim()}
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
