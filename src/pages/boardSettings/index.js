import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {changeBoardTitle, deleteBoard} from "../../redux/actionCreators/boardActionCreator";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Modal from "../../components/Modal";
import GoBack from "../../components/GoBack";
import {deleteCardsInBoard} from "../../redux/actionCreators/cardActionCreator";
import {getBoard} from "../../redux/selectors";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";

const Container = styled.div`
  margin: 0 2vw;
`;

const DeleteText = styled.p`
  color: #f66666;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: #ff0000;
  }
`;

const BoardSettings = () => {
	const {boardId} = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const board = useSelector(getBoard(boardId));

	const goBack = () => {
		if (board.title.length === 0 && board.lists.length === 0 && board.users.length === 1) delBoard();
		else navigate("../");
	};

	const delBoard = () => {
		dispatch(deleteBoard(boardId));
		dispatch(deleteCardsInBoard(boardId));
		navigate("/");
	};

	if (!board || board.status === "ERROR")
		return <PageError>This board doesn't exist........</PageError>;

	if (board.status === "LOADING")
		return <PageLoading/>;

	return (
		<Container>
			<GoBack onClick={goBack}>Return to the board</GoBack>
			<Title titleChange={title => dispatch(changeBoardTitle(boardId, title))} title={board.title}/>
			<Lists lists={board.lists} boardId={boardId}/>
			<Users users={board.users} boardId={boardId}/>
			<Modal prompt="Are you sure you want to delete this board?" onContinue={delBoard}><DeleteText>Delete board</DeleteText></Modal>
		</Container>
	);
};

export default BoardSettings;