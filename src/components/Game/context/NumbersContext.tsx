import React, { createContext, useContext, ReactNode } from "react";
import { randomNumber } from "../../../utils/randomNumber";
import { DEFAULT_EMPTY } from "../../../store/DEFAULT_EMPTY";
import { searchEmptySpace } from "../../../utils/searchEmptySpace";
import { generateNewRandomElement } from "../../../utils/generateNewRandomElement";

// Define the context type
interface NumberArraysContextType {
  numberArrays: number[][];
  startGame: () => void;
  MOVE: {
    up: () => void;
    down: () => void;
    left: () => void;
    right: () => void;
  };
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
  const [emptySpots, setEmptySpots] = React.useState<number[][]>(DEFAULT_EMPTY);

  //delete emoty spot with id x and y
  function removeEmptySpot(x: number, y: number) {
    setEmptySpots(
      emptySpots.filter((el) => el.toString() != [x, y].toString())
    );
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

  const MOVE = {
    left: () => {
      const newNumberArray = numberArrays.map((el) => {
        try {
          const withoutSpaces: number[] = el.filter((n) => n != 0);
          const summedNumbers = withoutSpaces.reduce(
            (sum: { skipNext: boolean; data: number[] }, n, index) => {
              if (sum.skipNext) {
                return { ...sum, skipNext: false };
              } else {
                if (
                  index + 1 < withoutSpaces.length &&
                  n == withoutSpaces?.[index + 1]
                ) {
                  return { skipNext: true, data: [...sum.data, n * 2] };
                } else {
                  return { skipNext: false, data: [...sum.data, n] };
                }
              }
            },
            { skipNext: false, data: [] }
          ).data;

          return [
            ...summedNumbers,
            ...new Array(4 - summedNumbers.length).fill(0),
          ];
        } catch (e) {
          return new Array(4).fill(0);
        }
      });
      const result = generateNewRandomElement(
        searchEmptySpace(newNumberArray),
        newNumberArray
      );
      setNumberArrays(result.numberArrays);
      setEmptySpots(result.emptySpots);
    },
    right: () => {
      const newNumberArray = numberArrays.map((el) => {
        try {
          const withoutSpaces: number[] = el.filter((n) => n != 0);
          const summedNumbers = withoutSpaces.reverse().reduce(
            (sum: { skipNext: boolean; data: number[] }, n, index) => {
              if (sum.skipNext) {
                return { ...sum, skipNext: false };
              } else {
                if (
                  index + 1 < withoutSpaces.length &&
                  n == withoutSpaces?.[index + 1]
                ) {
                  return { skipNext: true, data: [...sum.data, n * 2] };
                } else {
                  return { skipNext: false, data: [...sum.data, n] };
                }
              }
            },
            { skipNext: false, data: [] }
          ).data;

          return [
            ...summedNumbers,
            ...new Array(4 - summedNumbers.length).fill(0),
          ].reverse();
        } catch (e) {
          return new Array(4).fill(0);
        }
      });
      const result = generateNewRandomElement(
        searchEmptySpace(newNumberArray),
        newNumberArray
      );
      setNumberArrays(result.numberArrays);
      setEmptySpots(result.emptySpots);
    },
    up: () => {},
    down: () => {},
  };

  return (
    <NumberArraysContext.Provider
      value={{
        numberArrays,
        startGame,
        MOVE,
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
