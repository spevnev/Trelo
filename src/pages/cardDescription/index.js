import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteCard} from "../../redux/actionCreators/cardActionCreator";
import Title from "./Title";
import Assigned from "./Assigned";
import Description from "./Description";
import Images from "./Images";
import Files from "./Files";
import GoBack from "../../components/GoBack";
import Modal from "../../components/Modal";
import {getBoard, getCard} from "../../redux/selectors";
import PageError from "../../components/PageError";

const Container = styled.div`
  margin: 0 2vw;
`;

const isCardEmpty = card => card.title.length === 0 && card.description.length === 0 && card.assigned.length === 0 && card.images.length === 0 && card.files.length === 0;

const CardDescription = () => {
	const [isOpen, setOpen] = useState(false);
	const {boardId, cardId} = useParams();
	const ids = [boardId, cardId];
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const card = useSelector(getCard(boardId, cardId));
	const board = useSelector(getBoard(boardId));

	const goBack = () => {
		if (isCardEmpty(card))
			delCard();
		else if (card.title.length === 0)
			setOpen(true);
		else
			navigate("../");
	};

	const delCard = () => {
		dispatch(deleteCard(boardId, cardId));
		navigate("../");
	};

	if (!board || board.status !== "READY")
		return <PageError>This card doesn't exist!</PageError>;

	const users = board.users;
	const lists = board.lists;

	return (
		<Container>
			<GoBack onClick={goBack}>Return to the board</GoBack>
			<Title lists={lists} listId={card.listId} title={card.title} ids={ids}/>
			<Assigned assigned={card.assigned} users={users} ids={ids}/>
			<Description description={card.description} ids={ids}/>
			<Images images={card.images} ids={ids}/>
			<Files files={card.files} ids={ids}/>
			<Modal onCancel={() => setOpen(false)} onContinue={delCard} isOpenProp={isOpen} prompt="Title can't be empty! Do you want to delete this card?"/>
		</Container>
	);
};

export default CardDescription;