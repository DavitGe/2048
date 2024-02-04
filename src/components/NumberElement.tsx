import styled from "styled-components";
import { NUMBER_COLORS } from "../store/NUMBER_COLORS";

const Number = ({ number }: { number?: number }) => {
  return (
    <Container
      color={NUMBER_COLORS[number ?? 0].color}
      backgronudColor={NUMBER_COLORS[number ?? 0].backgroundColor}
    >
      {number !== 0 && number}
    </Container>
  );
};

const Container = styled.div<{ color: any; backgronudColor: string }>`
  padding: 10px;
  background-color: #efeee3;
  text-align: center;
  box-sizing: border-box;
  border-radius: 8px;
  width: 99px;
  height: 99px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Kanit", sans-serif;
  font-weight: 600;
  font-size: 32px;
  color: ${(props) => props.color ?? "#000"};
`;

export default Number;
