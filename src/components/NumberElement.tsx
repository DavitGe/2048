import styled from "styled-components";
import { NUMBER_COLORS } from "../store/NUMBER_COLORS";

const Number = ({ number, id }: { number?: number; id?: string }) => {
  return (
    <Container
      color={NUMBER_COLORS[number ?? 0].color}
      $backgroundColor={NUMBER_COLORS[number ?? 0].backgroundColor}
      id={id}
    >
      {number !== 0 && number}
    </Container>
  );
};

const Container = styled.div<{
  color: any;
  $backgroundColor: string;
  id?: string;
}>`
  padding: 10px;
  background-color: ${(props) => props.$backgroundColor};
  text-align: center;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Kanit", sans-serif;
  font-weight: 600;
  font-size: clamp(18px, 5vw, 36px);
  color: ${(props) => props.color ?? "#000"};

  position: relative;
`;

export default Number;
