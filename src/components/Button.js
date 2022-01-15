import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid #000;
  border-radius: 5px;
  transition: all .3s;

  ${props => props.primary ? `
	background: #4040ff;
	color: #fff;
	` : `
	background: #f0f0f0;
	color: #000;
  `}
  &:hover {
    transform: translateY(1px);
  }

  &:active {
    transform: translateY(3px);
  }
`;

export default Button;