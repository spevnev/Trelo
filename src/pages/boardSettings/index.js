import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {changeBoard, deleteBoard, fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import Users from "./Users";
import Title from "./Title";
import Lists from "./Lists";
import Modal from "../../components/Modal";
import GoBack from "../../components/GoBack";
import {getBoard, getUser} from "../../redux/selectors";
import usePageState from "../../hooks/usePageState";
import {changeBoards} from "../../redux/actionCreators/userActionCreator";
import bundle from "../../services";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";

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


const isEmpty = state => state.title.length === 0 && state.lists.length === 0 && state.users.length === 1;

let timeout = null;
const BoardSettings = () => {
	const [modalText, setModalText] = useState("Are you sure you want to delete this board?");
	const [isModalOpened, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {boardId} = useParams();
	const board = useSelector(getBoard(boardId));
	const user = useSelector(getUser());

	const ref = useRef(document.body);

	useKeyboard({ref, key: "escape", cb: () => goBack()});
	useTitle(board && board.title ? board.title + " settings" : "Settings");

	useEffect(() => () => clearTimeout(timeout), []);

	const [pageState, state, setState, isSaved, , clearTimer, saveChanges] = usePageState(
		() => {
			if (board && board.status === "READY") return board;

			if (user.boards) {
				const boards = user.boards.filter(cur => cur.id === boardId);
				if (boards.length === 1 && !boards[0].isOwner) navigate("../");
			}

			if (board === null) dispatch(fetchBoard(boardId));
			return null;
		},
		() => dispatch(fetchBoard(boardId, false)),
		() => !board || board.status === "ERROR", "This board doesn't exist or you aren't a member of it!",
		() => board.status === "LOADING",
		board,
		state => {
			dispatch(changeBoard(boardId, state));

			if (user.boards && user.boards.filter(cur => cur.id === boardId).length === 1) {
				const curUser = state.users.filter(cur => cur.username === user.username)[0];
				dispatch(changeBoards(user.boards.map(cur => cur.id === state.id ? {...cur, title: state.title, isOwner: curUser.isOwner} : cur)));
			}

			if (board === null) return;
			[...state.lists].filter(cur => board.lists.filter(l => cur.id === l.id && (cur.title !== l.title || cur.order !== l.order)).length !== 0).forEach(list => {
				bundle.board.changeList(boardId, list);
			});
		},
	);

	if (pageState) return pageState;


	const goBack = () => {
		if (!isSaved) saveChanges();

		if (isEmpty(state)) return delBoard();

		clearTimer();
		navigate("../");
	};

	const delBoard = () => {
		dispatch(deleteBoard(boardId, () => {
			clearTimer();
			navigate("/");
		}));
	};

	const open = text => {
		setIsModalOpen(true);
		setModalText(text);

		timeout = setTimeout(() => setModalText("Are you sure you want to delete this board?"), 3000);
	};


	return (
		<Container>
			<GoBack onClick={goBack}/>

			<Title titleChange={title => setState({title})} title={state.title}/>
			<Lists lists={state.lists} boardId={boardId} setState={setState}/>
			<Users users={state.users} boardId={boardId} open={open} setState={setState}/>
			<Modal isOpened={isModalOpened} text={modalText} onCancel={() => setIsModalOpen(false)} onContinue={delBoard}>
				<DeleteText>Delete board</DeleteText>
			</Modal>
		</Container>
	);
};

export default BoardSettings;