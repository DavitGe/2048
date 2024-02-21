import React, { createContext, useContext, ReactNode } from "react";
import { randomNumber } from "../../../utils/randomNumber";
import { DEFAULT_EMPTY } from "../../../store/DEFAULT_EMPTY";
import { searchEmptySpace } from "../../../utils/searchEmptySpace";
import { generateNewRandomElement } from "../../../utils/generateNewRandomElement";
import { DEFAULT_NUMBERARRAYS } from "../../../store/DEFAULT_NUMBERARRAYS";
import { rotateMatrix } from "../../../utils/rotateMatrix";

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
  emptySpots: number[][];
  score: number;
  isPlaying: boolean;
  restart: () => void;
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
  const [numberArrays, setNumberArrays] =
    React.useState<number[][]>(DEFAULT_NUMBERARRAYS);
  const [emptySpots, setEmptySpots] = React.useState<number[][]>(DEFAULT_EMPTY);
  const [score, setScore] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  //delete emoty spot with id x and y
  // function removeEmptySpot(x: number, y: number) {
  //   setEmptySpots(
  //     emptySpots.filter((el) => el.toString() != [x, y].toString())
  //   );
  // }

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

  function restart() {
    setIsPlaying(true);
    setScore(0);

    let randomIndex1 = randomNumber(0, DEFAULT_EMPTY.length - 1);
    let randomIndex2 = randomNumber(0, DEFAULT_EMPTY.length - 1);

    // Make sure randomIndex1 and randomIndex2 are different
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = randomNumber(0, DEFAULT_EMPTY.length - 1);
    }

    setNumberArrays(
      DEFAULT_NUMBERARRAYS.map((el, index) => {
        switch (index) {
          case DEFAULT_EMPTY[randomIndex1][0]:
            return el.map((n, i) =>
              i === DEFAULT_EMPTY[randomIndex1][1] ||
              (i === DEFAULT_EMPTY[randomIndex2][1] &&
                index === DEFAULT_EMPTY[randomIndex2][0])
                ? 2
                : n
            );
          case DEFAULT_EMPTY[randomIndex2][0]:
            return el.map((n, i) =>
              i === DEFAULT_EMPTY[randomIndex2][1] ? 2 : n
            );
          default:
            return el;
        }
      })
    );
    setEmptySpots(
      DEFAULT_EMPTY.filter((_, i) => i !== randomIndex1 && i !== randomIndex2)
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
                  setScore((prev) => prev + n * 2);
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
      if (result.gameOver) {
        setIsPlaying(false);
      }
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
                  setScore((prev) => prev + n * 2);
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
      if (result.gameOver) {
        setIsPlaying(false);
      }
      setNumberArrays(result.numberArrays);
      setEmptySpots(result.emptySpots);
    },
    up: () => {
      var newNumberArray: number[][] = [];

      for (let row = 0; row < numberArrays.length; row++) {
        var colNumberArray: number[] = []; //stores value of moved column (without 0s)
        var emptyIndex = numberArrays[row].length - 1; //lowest empty index
        var prevValue: number = -1; //last element except 0 (to add)
        for (let col = 0; col < numberArrays[row].length; col++) {
          const value = numberArrays[col][row]; //current element value
          if (value != 0) {
            if (prevValue == value) {
              setScore((prev) => prev + value * 2);
              prevValue = -1;
              colNumberArray[colNumberArray.length - 1] *= 2;
            } else {
              emptyIndex -= 1;
              prevValue = value;
              colNumberArray.push(value);
            }
          }
        }
        newNumberArray.push([
          ...new Array(numberArrays.length - colNumberArray.length).fill(0),
          ...colNumberArray.reverse(),
        ]);
      }
      const rotatedNumberArray: number[][] = rotateMatrix(
        newNumberArray,
        "right"
      );

      const result = generateNewRandomElement(
        searchEmptySpace(rotatedNumberArray),
        rotatedNumberArray
      );
      if (result.gameOver) {
        setIsPlaying(false);
      }

      setNumberArrays(result.numberArrays);
      setEmptySpots(result.emptySpots);
    },
    down: () => {
      var newNumberArray: number[][] = [];

      for (let row = numberArrays.length - 1; row >= 0; row--) {
        var colNumberArray: number[] = []; //stores value of moved column (without 0s)
        var emptyIndex = numberArrays[row].length - 1; //lowest empty index
        var prevValue: number = -1; //last element except 0 (to add)
        for (let col = numberArrays[row].length - 1; col >= 0; col--) {
          const value = numberArrays[col][row]; //current element value
          if (value != 0) {
            if (prevValue == value) {
              setScore((prev) => prev + value * 2);
              prevValue = -1;
              colNumberArray[colNumberArray.length - 1] *= 2;
            } else {
              emptyIndex += 1;
              prevValue = value;
              colNumberArray.push(value);
            }
          }
        }
        newNumberArray.push([
          ...new Array(numberArrays.length - colNumberArray.length).fill(0),
          ...colNumberArray.reverse(),
        ]);
      }
      const rotatedNumberArray: number[][] = rotateMatrix(
        newNumberArray,
        "left"
      );

      const result = generateNewRandomElement(
        searchEmptySpace(rotatedNumberArray),
        rotatedNumberArray
      );
      if (result.gameOver) {
        setIsPlaying(false);
      }

      setNumberArrays(result.numberArrays);
      setEmptySpots(result.emptySpots);
    },
  };

  return (
    <NumberArraysContext.Provider
      value={{
        numberArrays,
        startGame,
        MOVE,
        emptySpots,
        score,
        isPlaying,
        restart,
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
