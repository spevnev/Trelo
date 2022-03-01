import React, {useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {changeCard, deleteCard} from "../../redux/actionCreators/cardActionCreator";
import bundle from "../../services";
import Title from "./Title";
import Assigned from "./Assigned";
import Description from "./Description";
import Images from "./Images";
import Files from "./Files";
import GoBack from "../../components/GoBack";
import Modal from "../../components/Modal";
import {getBoard, getCard} from "../../redux/selectors";
import usePageState from "../../hooks/usePageState";
import {fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import deleteIcon from "../../assets/svg/cross.svg";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";

const Container = styled.div`
  padding: 0 2vw;
  height: 95vh;
  background: #f8f8f8;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Delete = styled.img`
  display: inline-block;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  margin: auto 1rem;
`;


const isCardEmpty = card => card.title.length === 0 && card.description.length === 0 && card.assigned.length === 0 && card.images.length === 0 && card.files.length === 0;

let timeout = null;
const CardDescription = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {boardId, cardId} = useParams();
	const card = useSelector(getCard(boardId, cardId));
	const board = useSelector(getBoard(boardId));

	const [overlay, setOverlay] = useState(false);
	const [modalText, setText] = useState();
	const [isOpen, setOpen] = useState(false);

	const ref = useRef(document.body);

	useKeyboard({ref, key: "escape", cb: () => goBack()});
	useTitle(card && card.title ? card.title : "Card");

	const [pageState, state, setState, isSaved, setSaved, clearTimer] = usePageState(
		() => {
			if (board && card && board.status === "READY") return card;

			if (!board) dispatch(fetchBoard(boardId));
			return null;
		},
		() => dispatch(fetchBoard(boardId, true)),
		() => !board || !card || (board.status && board.status === "ERROR"), "This card doesn't exist!",
		state => board.status === "LOADING" || !state,
		card,
		state => {
			[...state.files].filter(cur => card.files.filter(f => cur.url === f.url && cur.filename !== f.filename).length !== 0).forEach(file => {
				bundle.card.renameFile(boardId, file.filename, file.url);
			});

			dispatch(changeCard(boardId, state));
		},
	);

	if (pageState) return pageState;


	const openModal = text => {
		setText(text);
		setOpen(true);
	};

	const goBack = async () => {
		if (!isSaved) await dispatch(changeCard(boardId, state));

		if (isCardEmpty(card)) return delCard();
		else if (card.title.length === 0) return openModal("Title can't be empty! Do you want to delete this card?");

		clearTimer();
		navigate("../");
	};

	const delCard = () => {
		dispatch(deleteCard(boardId, cardId));
		clearTimer();
		navigate("../");
	};

	const onDragEnter = () => {
		setOverlay(true);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => setOverlay(false), 1000);
	};


	const users = board.users;
	const lists = board.lists;

	return (
		<Container onDragEnter={onDragEnter} onDrop={() => setOverlay(false)}>
			<SubContainer>
				<GoBack onClick={goBack}>Return to the board</GoBack>
				<Delete onClick={() => openModal("Are you sure you want to delete this card?")} src={deleteIcon}/>
			</SubContainer>
			<Modal onCancel={() => setOpen(false)} onContinue={delCard} isOpenProp={isOpen} prompt={modalText}/>

			<Title lists={lists} listId={state.listId} title={state.title} commitChanges={setState}/>
			<Assigned assignedNames={state.assigned} users={users} commitChanges={setState}/>
			<Description description={state.description} commitChanges={setState}/>
			<Images state={state} boardId={boardId} overlay={overlay} setSaved={setSaved} commitChanges={setState}/>
			<Files state={state} boardId={boardId} overlay={overlay} setSaved={setSaved} commitChanges={setState}/>
		</Container>
	);
};

export default CardDescription;