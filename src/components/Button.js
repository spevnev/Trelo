import styled from "styled-components";

const Button = styled.button`
  font-size: 18px;
  padding: 4px 8px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #f0f0f0;
  color: #000;
  transition: all .3s;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default Button;