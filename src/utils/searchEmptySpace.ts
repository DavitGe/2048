import { DEFAULT_EMPTY } from "../store/DEFAULT_EMPTY";

export function searchEmptySpace(numbersData: number[][]) {
  return DEFAULT_EMPTY.filter((el) => {
    return numbersData[el[0]][el[1]] === 0;
  });
}
