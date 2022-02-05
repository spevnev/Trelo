import React from "react";
import styled from "styled-components";
import Board from "./Board";
import NewBoard from "./NewBoard";
import {useSelector} from "react-redux";
import {getUserBoards} from "../../redux/selectors";
import PageLoading from "../../components/PageLoading";

const Boards = styled.div`
  margin: 15px 2vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;


const Dashboard = () => {
	const boards = useSelector(getUserBoards());


	if (!boards) return <PageLoading/>;


	return (
		<Boards>
			{boards.map(cur => <Board key={cur.id} {...cur}/>)}
			<NewBoard/>
		</Boards>
	);
};

export default Dashboard;