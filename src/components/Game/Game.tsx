import styled from "styled-components";
import NumberElement from "../NumberElement";
import { useNumberArraysContext } from "./context/NumbersContext";

const Game = () => {
  const { numberArrays, startGame, MOVE } = useNumberArraysContext();

  return (
    <>
      <Board>
        {numberArrays.map((el, index) =>
          el.map((n, i) => {
            return <NumberElement key={i + String(index)} number={n} />;
          })
        )}
      </Board>
      <button onClick={startGame}>Start</button>
      <button onClick={MOVE.left}>Left</button>
      <button onClick={MOVE.right}>Right</button>
    </>
  );
};

const Board = styled.div`
  background-color: #b29d85;
  border-radius: 16px;
  width: 424px;
  height: 424px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
`;

export default Game;
