import styled from "styled-components";
import NumberElement from "../NumberElement";
import { useNumberArraysContext } from "./context/NumbersContext";
import { useEffect } from "react";

const Game = () => {
  const { numberArrays, emptySpots, startGame, MOVE, score } =
    useNumberArraysContext();
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
  useEffect(() => {
    // Attach event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numberArrays, emptySpots, score]);

  return (
    <Wrapper>
      <Header>
        <div>
          <h1>2048</h1>
          <span>Play 2048 Game Online</span>
        </div>
        <div className="dashboard">
          <div>
            <h3>SCORE</h3>
            <span className="score">{score}</span>
          </div>
        </div>
      </Header>
      <Board>
        {numberArrays.map((el, index) =>
          el.map((n, i) => {
            return <NumberElement key={i + String(index)} number={n} />;
          })
        )}
      </Board>
      <button onClick={startGame}>Start</button>
    </Wrapper>
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
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #645441;
  font-weight: 600;
  padding-left: 38px;
  h1 {
    font-size: 64px;
  }
  margin-bottom: 24px;
  .dashboard {
    margin-right: 38px;
    padding-top: 6px;
    div {
      background-color: #645441;
      padding: 12px;
      border-radius: 6px;
      padding-inline: 24px;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      h3 {
        color: #d1b99d;
      }
      span {
        color: #fff;
        font-size: 24px;
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Game;
