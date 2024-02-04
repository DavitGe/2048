import styled from "styled-components";
import Game from "../components/Game/Game";

const MainPage = () => {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
