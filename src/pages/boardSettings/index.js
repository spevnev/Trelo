import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {changeBoard, deleteBoard, fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Modal from "../../components/Modal";
import GoBack from "../../components/GoBack";
import {deleteCardBoard} from "../../redux/actionCreators/cardActionCreator";
import {getBoard, getUser} from "../../redux/selectors";
import usePageState from "../../hooks/usePageState";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";

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
	const [prompt, setPrompt] = useState("Are you sure you want to delete this board?");
	const [isOpen, setOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));
	const user = useSelector(getUser());


	const saveChanges = state => {
		dispatch(changeBoard(boardId, state));

		const curUser = state.users.filter(cur => cur.username === user.username)[0];
		dispatch(changeBoards(user.boards.map(cur => cur.id === state.id ? {...cur, title: state.title, isOwner: curUser.isOwner} : cur)));
	};
	const [pageState, state, setState, isSaved, clearTimer] = usePageState(
		() => {
			if (board && board.status === "READY") return board;

			if (user.boards) {
				const boards = user.boards.filter(cur => cur.id === boardId);
				if (boards.length === 1 && !boards[0].isOwner) return <Navigate to="../"/>;
			}

			if (board === null) dispatch(fetchBoard(boardId));
			return null;
		},
		state => !state || state.status === "ERROR", "This board doesn't exist!",
		() => board.status === "LOADING",
		board, saveChanges,
	);

	if (pageState) return pageState;


	const goBack = () => {
		if (!isSaved) saveChanges(state);

		if (isEmpty(state)) return delBoard();

		clearTimer();
		navigate("../");
	};

	const delBoard = () => {
		dispatch(deleteBoard(boardId));
		dispatch(deleteCardBoard(boardId));

		clearTimer();
		navigate("/");
	};

	const open = text => {
		setOpen(true);
		setPrompt(text);

		setTimeout(() => {
			setPrompt("Are you sure you want to delete this board?");
		}, 3000);
	};


	return (
		<Container>
			<GoBack onClick={goBack}>Return to the board</GoBack>

			<Title titleChange={title => setState({title})} title={state.title}/>
			<Lists lists={state.lists} boardId={boardId} setState={setState}/>
			<Users users={state.users} boardId={boardId} open={open} setState={setState}/>
			<Modal isOpenProp={isOpen} prompt={prompt} onCancel={() => setOpen(false)} onContinue={delBoard}>
				<DeleteText>Delete board</DeleteText>
			</Modal>
		</Container>
	);
};

export default BoardSettings;