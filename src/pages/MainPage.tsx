import styled from "styled-components";
import Game from "../components/Game/Game";
import { NumberArraysProvider } from "../components/Game/context/NumbersContext";

const MainPage = () => {
  return (
    <Wrapper>
      <NumberArraysProvider>
        <Game />
      </NumberArraysProvider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 0;
    height: 100%;
    min-height: unset;
    justify-content: center;
  }

  button {
    padding-inline: clamp(10px, 3vw, 22px);
    padding-block: clamp(8px, 2vw, 10px);
    border: 1px solid #fff;
    background-color: #b29d85;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: clamp(12px, 3vw, 16px);
    border-radius: 8px;
    margin-top: 4px;
    cursor: pointer;

    transition: 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
`;

export default MainPage;
