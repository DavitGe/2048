import styled from "styled-components";
import NumberElement from "../NumberElement";

const Game = () => {
  const arr = [2, ...new Array(15).fill(0)];

  return (
    <Board>
      {arr.map((el) => (
        <NumberElement number={el} />
      ))}
    </Board>
  );
};

const Board = styled.div`
  background-color: #b29d85; //#b29d85
  border-radius: 16px;
  width: 424px;
  height: 424px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
`;

export default Game;
