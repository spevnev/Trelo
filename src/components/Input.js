import styled from "styled-components";

const StyledInput = styled.input`
  background: #f4f4f4;
  border: none;
  border-radius: 2px;
  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  outline: none;
  width: 100%;
  padding: 6px 12px;
  font-size: 18px;

  &:hover {
    background: #fbfbfb;
  }

  &:focus {
    background: #fff;
  }
`;

export default StyledInput;