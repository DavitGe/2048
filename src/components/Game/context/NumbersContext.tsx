import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the context type
interface NumberArraysContextType {
  numberArrays: number[][];
  setNumberArrays: Dispatch<SetStateAction<number[][]>>;
}

// Create the context
const NumberArraysContext = createContext<NumberArraysContextType | undefined>(
  undefined
);

// Create a provider component
interface NumberArraysProviderProps {
  children: ReactNode;
}

export const NumberArraysProvider: React.FC<NumberArraysProviderProps> = ({
  children,
}) => {
  const [numberArrays, setNumberArrays] = React.useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <NumberArraysContext.Provider value={{ numberArrays, setNumberArrays }}>
      {children}
    </NumberArraysContext.Provider>
  );
};

// Create a custom hook for using the context
export const useNumberArraysContext = (): NumberArraysContextType => {
  const context = useContext(NumberArraysContext);
  if (!context) {
    throw new Error(
      "useNumberArraysContext must be used within a NumberArraysProvider"
    );
  }
  return context;
};
