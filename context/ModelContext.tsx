"use client";
// context/ModelContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface ModelContextProps {
  defaultModel: string;
  setDefaultModel: (model: string) => void;
  comparisonModel: string;
  setComparisonModel: (model: string) => void;
  additionalModels: string[];
  setAdditionalModels: (models: string[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  showResponses: boolean;
  setShowResponses: (state: boolean) => void;
  selectedMetrics: string[]; // ✅ Add this
  setSelectedMetrics: (metrics: string[]) => void; // ✅ Add this
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [defaultModel, setDefaultModel] = useState<string>("OpenAI 4o-mini");
  const [comparisonModel, setComparisonModel] = useState<string>("");
  const [additionalModels, setAdditionalModels] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [showResponses, setShowResponses] = useState<boolean>(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]); // ✅ Add this

  return (
    <ModelContext.Provider
      value={{
        defaultModel,
        setDefaultModel,
        comparisonModel,
        setComparisonModel,
        additionalModels,
        setAdditionalModels,
        inputValue,
        setInputValue,
        selectedModels,
        setSelectedModels,
        showResponses,
        setShowResponses,
        selectedMetrics, // ✅ Provide state
        setSelectedMetrics, // ✅ Provide setter
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModelContext must be used within a ModelProvider");
  }
  return context;
}
