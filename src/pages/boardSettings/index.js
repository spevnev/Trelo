import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {changeBoard, deleteBoard, fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Modal from "../../components/Modal";
import GoBack from "../../components/GoBack";
import {deleteCardsInBoard} from "../../redux/actionCreators/cardActionCreator";
import {getBoard} from "../../redux/selectors";
import PageError from "../../components/PageError";
import PageLoading from "../../components/PageLoading";
import useDebounce from "../../components/useDebounce";

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


const isEmpty = state => state.title.length === 0 && state.lists.length === 0 && state.users.length === 1;

const BoardSettings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));


	const initialState = board && board.status === "READY" ? board : null;
	const saveChanges = state => dispatch(changeBoard(boardId, state));
	const [state, setState, isSaved, clearTimer] = useDebounce(saveChanges, initialState);

	useEffect(() => {
		if (board === null) dispatch(fetchBoard(boardId));
	}, []);

	useEffect(() => {
		if ((!state || state.status === "LOADING") && board) setState(board, false);
	}, [board]);


	if (!state || state.status === "ERROR") return <PageError>This board doesn't exist........</PageError>;
	if (state.status === "LOADING") return <PageLoading/>;


	const goBack = () => {
		if (!isSaved) saveChanges(state);

		if (isEmpty(state)) return delBoard();

		clearTimer();
		navigate("../");
	};

	const delBoard = () => {
		dispatch(deleteBoard(boardId));
		dispatch(deleteCardsInBoard(boardId));

		clearTimer();
		navigate("/");
	};


	return (
		<Container>
			<GoBack onClick={goBack}>Return to the board</GoBack>
			<Modal prompt="Are you sure you want to delete this board?" onContinue={delBoard}><DeleteText>Delete board</DeleteText></Modal>

			<Title titleChange={title => setState({title})} title={state.title}/>
			<Lists lists={state.lists} boardId={boardId} setState={setState}/>
			<Users users={state.users} setState={setState}/>
		</Container>
	);
};

export default BoardSettings;