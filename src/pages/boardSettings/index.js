import React from "react";
import {useParams} from "react-router";
import styled from "styled-components";

import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";

const Container = styled.div`
  margin: 2vh 2vw;
`;

const BoardSettings = () => {
	const {boardId} = useParams();

	return (
		<Container>
			<Title/>
			<Lists/>
			<Users/>
		</Container>
	);
};

export default BoardSettings;