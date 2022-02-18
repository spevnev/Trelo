import React, {useState} from "react";
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

const Container = styled.div`
  margin: 0 2vw;
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

const CardDescription = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {boardId, cardId} = useParams();
	const card = useSelector(getCard(boardId, cardId));
	const board = useSelector(getBoard(boardId));

	const [modalText, setText] = useState();
	const [isOpen, setOpen] = useState(false);


	const [pageState, state, setState, isSaved, clearTimer] = usePageState(
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
			[...state.files].filter(cur => card.files.filter(f => cur.id === f.id && cur.filename !== f.filename).length !== 0).forEach(file => {
				bundle.card.renameFile(boardId, file.filename, file.id);
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


	const users = board.users;
	const lists = board.lists;

	return (
		<Container>
			<SubContainer>
				<GoBack onClick={goBack}>Return to the board</GoBack>
				<Delete onClick={() => openModal("Are you sure you want to delete this card?")} src={deleteIcon}/>
			</SubContainer>
			<Modal onCancel={() => setOpen(false)} onContinue={delCard} isOpenProp={isOpen} prompt={modalText}/>

			<Title lists={lists} listId={state.listId} title={state.title} commitChanges={setState}/>
			<Assigned assignedNames={state.assigned} users={users} commitChanges={setState}/>
			<Description description={state.description} commitChanges={setState}/>
			<Images state={state} boardId={boardId} commitChanges={setState}/>
			<Files state={state} boardId={boardId} commitChanges={setState}/>
		</Container>
	);
};

export default CardDescription;