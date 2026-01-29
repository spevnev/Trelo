import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {ChangeBoard, DeleteBoard, FetchBoard} from "../../redux/thunkActionCreators/boardActionCreator";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Modal from "../../components/Modal";
import GoBack from "../../components/GoBack";
import {getBoard, getUser} from "../../redux/selectors";
import usePageState from "../../hooks/usePageState";
import bundle from "../../services/api";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";
import PageError from "../../components/PageError";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";

const Container = styled.div`
  padding: 0 2vw;
  height: 95vh;
  background: #f8f8f8;
`;

const DeleteText = styled.p`
  color: #f66666;
  font-size: 18px;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: #ff0000;
  }
`;

const modalDeleteText = "Are you sure you want to delete this board?";
const modalLeaveText = "If you leave, the board will be deleted.";

let saveOnExit = true;
let currentBoard = {}; // idk why, but board variable inside saveChanges function isn't latest, unlike this one
const BoardSettings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {boardId} = useParams();

	const [isModalOpened, setIsModalOpen] = useState(false);
	const board = useSelector(getBoard(boardId));
	const user = useSelector(getUser());
	const containerRef = useRef();

	useKeyboard({ref: containerRef, key: "escape", cb: () => goBack()});

	useTitle(board && board.title ? board.title + " settings" : "Settings");

	useEffect(() => {
		currentBoard = board;
	}, [board]);

	const shouldBeRedirected = () => {
		if (user.boards) {
			const boards = user.boards.filter(board => board.id === boardId);
			if (boards.length === 1 && !boards[0].isOwner) return true;
		}

		return false;
	};

	useEffect(() => {
		if (shouldBeRedirected()) navigate("../");
	}, [user]);


	const initState = () => {
		if (board && board.status === "READY") return board;

		if (!board) dispatch(FetchBoard(boardId));
	};
	const onLoad = () => dispatch(FetchBoard(boardId, false));
	const isError = () => !board || board.status === "ERROR";
	const errorElement = <PageError>This board doesn't exist or you aren't a member of it!</PageError>;
	const isLoading = () => board && board.status === "LOADING";
	const deps = board;
	const debounce = state => {
		if (!saveOnExit) return;

		if (currentBoard.lists) {
			const boardListIds = currentBoard.lists.map(list => list.id);
			state = {...state, lists: state.lists.filter(list => boardListIds.indexOf(list.id) !== -1)};
		}

		dispatch(ChangeBoard(boardId, state));

		const isInUsersBoards = user.boards && user.boards.filter(board => board.id === boardId).length === 1;
		if (isInUsersBoards) {
			const curUser = state.users.filter(user => user.username === user.username)[0];
			dispatch(changeBoards(user.boards.map(board => board.id === state.id ? {...board, title: state.title, isOwner: curUser.isOwner} : board)));
		}

		if (board) {
			const listsCopy = [...state.lists];
			const listIds = board.lists.map(list => list.id);

			const areListsEqual = (l1, l2) => l1.title === l2.title && l1.order === l2.order;

			listsCopy.forEach(list => {
				const idx = listIds.indexOf(list.id);
				if (idx === -1) return;

				const prev = board.lists[idx];
				if (!areListsEqual(list, prev)) bundle.boardAPI.changeList(boardId, list);
			});
		}
	};
	const [pageState, state, setState, , clearTimer] = usePageState(initState, onLoad, isError, errorElement, isLoading, deps, debounce);

	if (pageState) return pageState;


	const isEmpty = () => !state.title && state.users.length === 1;

	const goBack = () => {
		if (isEmpty()) return deleteBoard();

		clearTimer();
		navigate("../");
	};

	const deleteBoard = () => {
		dispatch(DeleteBoard(boardId, () => {
			clearTimer();
			saveOnExit = false;
			navigate("/");
		}));
	};


	return (
		<Container ref={containerRef}>
			<GoBack onClick={goBack}/>

			<Title titleChange={title => setState({title})} title={state.title}/>
			<Lists lists={state.lists} boardId={boardId} setState={setState}/>
			<Users users={state.users} boardId={boardId} openModal={() => setIsModalOpen(true)} setState={setState}/>

			<Modal text={modalDeleteText} onContinue={deleteBoard}>
				<DeleteText>Delete board</DeleteText>
			</Modal>
			<Modal text={modalLeaveText} isOpened={isModalOpened} onCancel={() => setIsModalOpen(false)} onContinue={deleteBoard}/>
		</Container>
	);
};

export default BoardSettings;