import styled from "styled-components";
import Button from "../../components/Button";

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 60vw;
  height: 60vh;
  margin: auto 0;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.3);
`;

export const TitleContainer = styled.div`
  margin-top: 3vh;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
`;


export const SubContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 2vh 2vw;
  background: ${props => `#${props.colour}`};
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
