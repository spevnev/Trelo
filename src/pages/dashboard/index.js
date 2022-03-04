import React from "react";
import styled from "styled-components";
import Board from "./Board";
import NewBoard from "./NewBoard";
import {useSelector} from "react-redux";
import {getUserBoards} from "../../redux/selectors";
import PageLoading from "../../components/PageLoading";
import useTitle from "../../hooks/useTitle";

const Boards = styled.div`
  padding: 15px 2vw;
  height: 95vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  background: #f1f1f1;
  overflow-y: scroll;
`;


const Dashboard = () => {
	const boards = useSelector(getUserBoards());
	useTitle("Dashboard");


	if (!boards) return <PageLoading/>;


	return (
		<Boards>
			{boards.map(cur => <Board key={cur.id} {...cur}/>)}
			<NewBoard/>
		</Boards>
	);
};

export default Dashboard;