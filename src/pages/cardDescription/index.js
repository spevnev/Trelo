import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {changeCard, deleteCard} from "../../redux/actionCreators/cardActionCreator";
import Title from "./Title";
import Assigned from "./Assigned";
import Description from "./Description";
import Images from "./Images";
import Files from "./Files";
import GoBack from "../../components/GoBack";
import Modal from "../../components/Modal";
import {getBoard, getCard} from "../../redux/selectors";
import PageError from "../../components/PageError";
import useDebounce from "../../components/useDebounce";
import {fetchBoard} from "../../redux/actionCreators/boardActionCreator";
import PageLoading from "../../components/PageLoading";
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


	const initialState = card && board && board.status === "READY" ? card : null;
	const saveChanges = state => dispatch(changeCard(boardId, state));
	const [state, setState, isSaved, clearTimer] = useDebounce(saveChanges, initialState);

	useEffect(() => {
		if (board === null) dispatch(fetchBoard(boardId));
	}, []);

	useEffect(() => {
		if (!state && card) setState(card, false);
	}, [card]);


	if (!board || board.status === "ERROR") return <PageError>This card doesn't exist!</PageError>;
	if (!state || board.status === "LOADING") return <PageLoading/>;


	const openModal = text => {
		setText(text);
		setOpen(true);
	};

	const goBack = async () => {
		if (!isSaved) await saveChanges(state);

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
			<Assigned assigned={state.assigned} users={users} commitChanges={setState}/>
			<Description description={state.description} commitChanges={setState}/>
			<Images images={state.images} commitChanges={setState}/>
			<Files files={state.files} commitChanges={setState}/>
		</Container>
	);
};

export default CardDescription;