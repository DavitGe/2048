import styled from "styled-components";
import NumberElement from "../NumberElement";
import { useNumberArraysContext } from "./context/NumbersContext";
import { useEffect } from "react";

const Game = () => {
  const { numberArrays, startGame, MOVE } = useNumberArraysContext();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          MOVE.up();
          break;
        case "ArrowDown":
          MOVE.down();
          break;
        case "ArrowLeft":
          MOVE.left();
          break;
        case "ArrowRight":
          MOVE.right();
          break;
        default:
          // Handle other key presses if needed
          break;
      }
    };
    // Attach event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      {/* <button onClick={MOVE.left}>Left</button>
      <button onClick={MOVE.right}>Right</button>
      <button onClick={MOVE.down}>down</button> */}
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
