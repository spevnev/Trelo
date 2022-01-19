import React from "react";
import styled from "styled-components";

import Board from "./Board";
import NewBoard from "./NewBoard";

const Boards = styled.div`
  margin: 15px 2vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Dashboard = () => {
	return (
		<Boards>
			<Board title="Board title 1" id={1} isFavourite={false}/>
			<Board title="Board title 2" id={2} isFavourite={true}/>
			<Board title="Board title 3" id={3} isFavourite={true}/>
			<Board title="Board title 4" id={4} isFavourite={false}/>

			<NewBoard/>
		</Boards>
	);
};

export default Dashboard;