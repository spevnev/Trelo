import React from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";

import arrowBack from "../../assets/svg/arrow-left.svg";

import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";

const Container = styled.div`
  margin: 0 2vw;
`;

const GoBack = styled.div`
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

const BoardSettings = () => {
	const {boardId} = useParams();
	const navigate = useNavigate();

	const goBack = () => navigate("../");

	return (
		<Container>
			<GoBack onClick={goBack}>
				<img src={arrowBack} alt=""/>
				Return to the board
			</GoBack>

			<Title/>
			<Lists/>
			<Users/>
		</Container>
	);
};

export default BoardSettings;