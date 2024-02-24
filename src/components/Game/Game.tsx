import styled from "styled-components";
import NumberElement from "../NumberElement";
import { useNumberArraysContext } from "./context/NumbersContext";
import { useEffect } from "react";
import { DEFAULT_NUMBERARRAYS } from "../../store/DEFAULT_NUMBERARRAYS";

const Game = () => {
  const {
    numberArrays,
    emptySpots,
    startGame,
    MOVE,
    score,
    isPlaying,
    restart,
  } = useNumberArraysContext();
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
    startGame();
  }, []);
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
          <button onClick={restart}>New Game</button>
        </div>
      </Header>
      <GameOverText isPlaying={isPlaying}>Game Over!</GameOverText>
      <Board isPlaying={isPlaying}>
        <Template>
          {DEFAULT_NUMBERARRAYS.map((el, index) =>
            el.map((n, i) => {
              return (
                <NumberElement
                  key={i + String(index)}
                  number={n}
                  id={`empty-${index}-${i}`}
                />
              );
            })
          )}
        </Template>
        {numberArrays.map((el, index) =>
          el.map((n, i) => {
            return (
              <NumberElement
                key={i + String(index)}
                number={n}
                id={`${index}-${i}`}
              />
            );
          })
        )}
      </Board>
    </Wrapper>
  );
};

const Board = styled.div<{ isPlaying: boolean }>`
  position: relative;
  background-color: #b29d85;
  border-radius: 16px;
  width: 424px;
  height: 424px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;

  transition: 0.3s ease;
  opacity: ${(props) => (props.isPlaying ? "1" : "0.4")};

  .move-left {
    animation: moveLeft 0.1s ease-in-out infinite;

    @keyframes moveLeft {
      0% {
        left: 0;
      }
      100% {
        left: -100%;
      }
    }
  }
`;

const Template = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 384px;
  height: 384px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
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
    /* padding-top: 6px; */
    div {
      background-color: #645441;
      padding: 8px;
      border-radius: 6px;
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

const GameOverText = styled.h1<{ isPlaying: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: 0.3s ease;
  color: #645441;
  font-size: 48px;
  font-weight: 600;

  opacity: ${(props) => (props.isPlaying ? 0 : 1)};
  z-index: ${(props) => (props.isPlaying ? -10 : 10)};
`;

export default Game;
