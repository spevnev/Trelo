import React from "react";
import arrowBack from "../assets/svg/arrow-left.svg";
import styled from "styled-components";

const GoBackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
  margin: 2vh 0;

  & img {
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
  }
`;

const GoBack = ({onClick, children}) => {
	return (
		<GoBackContainer onClick={onClick}>
			<img src={arrowBack} alt=""/>
			{children}
		</GoBackContainer>
	);
};

export default GoBack;