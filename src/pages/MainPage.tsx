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
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    padding-inline: 22px;
    padding-block: 10px;
    border: 1px solid #fff;
    background-color: #b29d85;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 16px;
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
