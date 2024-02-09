import { randomNumber } from "./randomNumber";

//function to change one element only. x is index for main array, y for childs, value sets it.
function addNumberElement(
  x: number,
  y: number,
  value: number,
  numberArrays: number[][]
) {
  return numberArrays.map((el, index) =>
    index === x ? el.map((n, i) => (i === y ? value : n)) : el
  );
}

//function to create 2 in random empty spot
export function generateNewRandomElement(
  emptySpots: number[][],
  numberArrays: number[][]
) {
  if (emptySpots.length === 0) {
    return {
      emptySpots: [],
      numberArrays,
      gameOver: true,
    };
  }
  if (emptySpots.length === 1) {
    return {
      emptySpots: [],
      numberArrays: addNumberElement(
        emptySpots[0][0],
        emptySpots[0][1],
        2,
        numberArrays
      ),
    };
  }
  const randomIndex = randomNumber(0, emptySpots.length - 1);
  return {
    emptySpots: emptySpots.splice(randomIndex, 1),
    numberArrays: addNumberElement(
      emptySpots[randomIndex][0],
      emptySpots[randomIndex][1],
      2,
      numberArrays
    ),
  };
}
