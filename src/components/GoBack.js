import React from "react";
import arrowBack from "../assets/svg/arrow-left.svg";
import styled from "styled-components";

const GoBackContainer = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  margin: 2vh 0;

  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const GoBack = ({onClick, children}) => (
	<GoBackContainer onClick={onClick}>
		<img src={arrowBack} alt=""/>
		{children}
	</GoBackContainer>
);

export default GoBack;