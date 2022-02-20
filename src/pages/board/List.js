import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid} from "uuid";
import Card from "./Card";
import {useNavigate} from "react-router";
import {addCard} from "../../redux/actionCreators/cardActionCreator";
import {Droppable} from "react-beautiful-dnd";
import {getBoard} from "../../redux/selectors";

const Title = styled.p`
  font-size: 2rem;
  margin-bottom: 5px;
`;

const ListContainer = styled.div`
  width: 25rem;
  background: #ebecf0;
  margin: 0 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  overflow: hidden;
  font-weight: 300;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
    opacity: 0;
  }
`;

const InnerContainer = styled.div`
  overflow-y: scroll;
  height: 100%;
  margin: 5px 0;
  max-height: 70vh;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
    opacity: 0;
  }
`;

const AddCard = styled.p`
  cursor: pointer;
  font-size: 1.4rem;
`;


const List = ({title, cards, boardId, id}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const users = useSelector(getBoard(boardId)).users;


	const newCard = () => {
		const cardId = uuid();

		dispatch(addCard(boardId, id, cardId));
		navigate(cardId);
	};


	return (
		<Droppable droppableId={id}>
			{provided => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<ListContainer>
						<Title>{title}</Title>
						<InnerContainer>
							{cards && cards.map((card, i) => <Card key={card.id} users={users} boardId={boardId} i={i} {...card}/>)}
							{provided.placeholder}
						</InnerContainer>
						<AddCard onClick={newCard}>+ Add card</AddCard>
					</ListContainer>
				</div>
			)}
		</Droppable>
	);
};

export default List;