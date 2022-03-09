import React from "react";
import arrowBack from "../assets/svg/arrow-left.svg";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  margin: 2vh 0;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;


const GoBack = ({onClick}) => (
	<Container onClick={onClick}>
		<Image src={arrowBack}/>
		<p>Return to the board</p>
	</Container>
);

export default GoBack;