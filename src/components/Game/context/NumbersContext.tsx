import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { randomNumber } from "../../../utils/randomNumber";

// Define the context type
interface NumberArraysContextType {
  numberArrays: number[][];
  emptySpots: number[][];
  setNumberArrays: Dispatch<SetStateAction<number[][]>>;
  startGame: () => void;
  generateNewRandomElement: () => void;
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
  const [emptySpots, setEmptySpots] = React.useState<number[][]>([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ]);

  function removeEmptySpot(x: number, y: number) {
    setEmptySpots(
      emptySpots.filter((el) => el.toString() != [x, y].toString())
    );
  }

  //function to change one element only. x is index for main array, y for childs, value sets it.
  function setNumberElement(x: number, y: number, value: number) {
    removeEmptySpot(x, y);
    setNumberArrays(
      numberArrays.map((el, index) =>
        index === x ? el.map((n, i) => (i === y ? value : n)) : el
      )
    );
  }

  //function to create 2 in random empty spot
  function generateNewRandomElement() {
    const randomIndex = randomNumber(0, emptySpots.length - 1);
    setNumberElement(emptySpots[randomIndex][0], emptySpots[randomIndex][1], 2);
  }

  //function to start game(createing 2 random elements)
  function startGame() {
    let randomIndex1 = randomNumber(0, emptySpots.length - 1);
    let randomIndex2 = randomNumber(0, emptySpots.length - 1);

    // Make sure randomIndex1 and randomIndex2 are different
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = randomNumber(0, emptySpots.length - 1);
    }

    setNumberArrays(
      numberArrays.map((el, index) => {
        switch (index) {
          case emptySpots[randomIndex1][0]:
            return el.map((n, i) =>
              i === emptySpots[randomIndex1][1] ||
              (i === emptySpots[randomIndex2][1] &&
                index === emptySpots[randomIndex2][0])
                ? 2
                : n
            );
          case emptySpots[randomIndex2][0]:
            return el.map((n, i) =>
              i === emptySpots[randomIndex2][1] ? 2 : n
            );
          default:
            return el;
        }
      })
    );
    setEmptySpots(
      emptySpots.filter((_, i) => i !== randomIndex1 && i !== randomIndex2)
    );
  }

  return (
    <NumberArraysContext.Provider
      value={{
        numberArrays,
        setNumberArrays,
        startGame,
        generateNewRandomElement,
        emptySpots,
      }}
    >
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
