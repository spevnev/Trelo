import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {changeBoardTitle, deleteBoard} from "../../redux/actionCreators/boardActionCreator";
import arrowBack from "../../assets/svg/arrow-left.svg";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Delete from "./Delete";

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
	const board = useSelector(state => state.board.filter(cur => cur.id === boardId)[0]);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goBack = () => {
		if (board.title.length === 0 && board.lists.length === 0 && board.users.length === 1) delBoard();
		else navigate("../");
	};

	const delBoard = () => {
		dispatch(deleteBoard(boardId));
		navigate("/");
	};

	return (
		<Container>
			<GoBack onClick={goBack}>
				<img src={arrowBack} alt=""/>
				Return to the board
			</GoBack>

			<Title titleChange={title => dispatch(changeBoardTitle(boardId, title))} title={board.title}/>
			<Lists lists={board.lists} boardId={boardId}/>
			<Users users={board.users} boardId={boardId}/>
			<Delete deleteBoard={delBoard}/>
		</Container>
	);
};

export default BoardSettings;