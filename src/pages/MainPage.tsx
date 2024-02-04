import styled from "styled-components";

const MainPage = () => {
  return (
    <Wrapper>
      <Board></Board>
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

const Board = styled.div`
  background-color: #b29d85;
  border: 8px solid #23182a;
  border-radius: 16px;
  width: 724px;
  height: 924px;
`;

export default MainPage;
