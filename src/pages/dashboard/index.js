import React from "react";
import styled from "styled-components";
import Board from "./Board";
import {useDispatch, useSelector} from "react-redux";
import {getUserBoards} from "../../redux/selectors";
import useTitle from "../../hooks/useTitle";
import {BoardContainer} from "./styles";
import {useNavigate} from "react-router";
import {v4 as uuid} from "uuid";
import {NewBoard} from "../../redux/actionCreators/boardActionCreator";
import PageLoading from "../../components/PageLoading";

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

const CenteredText = styled.p`
  font-size: 24px;
  margin: auto;
`;


const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const boards = useSelector(getUserBoards());

	useTitle("Dashboard");


	const openSettings = () => {
		const boardId = uuid();
		dispatch(NewBoard(boardId, () => navigate(`/board/${boardId}/settings`)));
	};


	if (!boards) return <PageLoading/>;

	return (
		<Boards>
			{boards.sort().map(board => <Board key={board.id} {...board}/>)}

			<BoardContainer onClick={openSettings} style={{order: 999}}>
				<CenteredText>New board</CenteredText>
			</BoardContainer>
		</Boards>
	);
};

export default Dashboard;