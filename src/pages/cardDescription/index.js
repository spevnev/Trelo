import React, {useState} from "react";
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

const Container = styled.div`
  margin: 0 2vw;
`;

const isCardEmpty = card => card.title.length === 0 && card.description.length === 0 && card.assigned.length === 0 && card.images.length === 0 && card.files.length === 0;

const CardDescription = () => {
	const [isOpen, setOpen] = useState(false);
	const {boardId, cardId} = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const card = useSelector(getCard(boardId, cardId));
	const users = useSelector(getBoard(boardId)).users;

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

	const cancel = () => setOpen(false);

	const commitChanges = changes => dispatch(changeCard(boardId, cardId, changes));

	return (
		<Container>
			<GoBack onClick={goBack}>Return to the board</GoBack>
			<Title title={card.title} commitChanges={commitChanges}/>
			<Assigned assigned={card.assigned} users={users} commitChanges={commitChanges}/>
			<Description description={card.description} commitChanges={commitChanges}/>
			<Images images={card.images} commitChanges={commitChanges}/>
			<Files files={card.files} commitChanges={commitChanges}/>
			<Modal onCancel={cancel} onContinue={delCard} isOpenProp={isOpen} prompt="Title can't be empty! Do you want to delete this card?"/>
		</Container>
	);
};

export default CardDescription;