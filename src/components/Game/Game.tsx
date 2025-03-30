import styled from "styled-components";
import NumberElement from "../NumberElement";
import { useNumberArraysContext } from "./context/NumbersContext";
import { useEffect, useRef, useState } from "react";
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

  // Add touch handling state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    const touchXY = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setTouchStart(touchXY);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    const touchXY = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setTouchEnd(touchXY);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          // Swiped left
          MOVE.left();
        } else {
          // Swiped right
          MOVE.right();
        }
      }
    } else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          // Swiped up
          MOVE.up();
        } else {
          // Swiped down
          MOVE.down();
        }
      }
    }

    // Reset
    setTouchStart(null);
    setTouchEnd(null);
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
        <div className="title">
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
      <Instructions>
        <p>
          HOW TO PLAY: <span className="desktop-only">Use arrow keys</span>
          <span className="mobile-only">Swipe up/down/left/right</span> to move
          tiles
        </p>
      </Instructions>
      <GameOverText isPlaying={isPlaying}>Game Over!</GameOverText>
      <Board
        isPlaying={isPlaying}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="no-select"
      >
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
  width: min(90vw, 424px);
  height: min(90vw, 424px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  touch-action: none; /* Prevent browser handling of touch events */
  transition: 0.3s ease;
  opacity: ${(props) => (props.isPlaying ? "1" : "0.4")};

  @media (max-width: 480px) {
    width: min(85vw, 424px);
    height: min(85vw, 424px);
    padding: 15px;
    gap: 8px;
  }

  .move-left {
    animation: moveLeft 0.1s ease-in infinite;

    @keyframes moveLeft {
      0% {
        left: 0;
      }
      100% {
        left: -100%;
      }
    }
  }

  .move-right {
    z-index: 1;
    animation: moveRight 0.1s ease-in infinite;

    @keyframes moveRight {
      0% {
        right: 0;
      }
      100% {
        right: -100%;
      }
    }
  }

  .move-top {
    z-index: 1;
    animation: moveTop 0.1s ease-in infinite;

    @keyframes moveTop {
      0% {
        top: 0;
      }
      100% {
        top: -100%;
      }
    }
  }

  .move-bottom {
    z-index: 1;
    animation: moveBottom 0.1s ease-in infinite;

    @keyframes moveBottom {
      0% {
        bottom: 0;
      }
      100% {
        bottom: -100%;
      }
    }
  }
`;

const Template = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
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
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;

  h1 {
    font-size: clamp(32px, 8vw, 64px);
  }

  margin-bottom: 24px;

  .title span {
    font-size: clamp(12px, 3vw, 16px);
  }

  .dashboard {
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
        font-size: clamp(10px, 2.5vw, 14px);
      }
      span {
        color: #fff;
        font-size: clamp(16px, 4vw, 24px);
      }
    }

    button {
      font-size: clamp(12px, 3vw, 16px);
      padding: 8px;
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
    margin-bottom: 15px;

    .dashboard {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      div,
      button {
        flex: 1;
      }
    }
  }
`;

const Instructions = styled.div`
  text-align: center;
  margin-bottom: 15px;
  color: #645441;
  font-size: clamp(10px, 2.5vw, 14px);

  .desktop-only {
    display: none;
  }

  @media (min-width: 769px) {
    .desktop-only {
      display: inline;
    }
    .mobile-only {
      display: none;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(95%, 500px);
  padding: 10px;

  @media (max-width: 480px) {
    padding: 5px;
    height: 100vh;
    justify-content: center;
  }
`;

const GameOverText = styled.h1<{ isPlaying: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: 0.3s ease;
  color: #645441;
  font-size: clamp(24px, 6vw, 48px);
  font-weight: 600;

  opacity: ${(props) => (props.isPlaying ? 0 : 1)};
  z-index: ${(props) => (props.isPlaying ? -10 : 10)};
`;

export default Game;
