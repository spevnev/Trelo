import styled from "styled-components";
import Button from "../../components/Button";

export const SubContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 1.5rem 2rem;
  background: ${props => `#${props.background}`};
  color: ${props => `#${props.colour}`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  & Input {
    margin: 5px 0;
  }
`;

export const StyledButton = styled(Button)`
  width: 50%;
  display: block;
  margin: 5px auto;
`;

export const Text = styled.p`
  font-size: ${props => props.secondary ? "18px" : "28px"};
  text-align: center;
`;