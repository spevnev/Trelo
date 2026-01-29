import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuid} from "uuid";
import Card from "./Card";
import {useNavigate} from "react-router";
import {AddCard} from "../../redux/thunkActionCreators/cardActionCreator";
import {Droppable} from "@hello-pangea/dnd";
import {getBoard} from "../../redux/selectors";

const Title = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
`;

const ListContainer = styled.div`
  width: 250px;
  background: #ebecf0;
  margin-right: 20px;
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

const Text = styled.p`
  cursor: pointer;
  font-size: 14px;
`;


const List = ({title, order, boardId, id, cards}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const users = useSelector(getBoard(boardId)).users;


	const addCard = () => {
		const cardId = uuid();
		dispatch(AddCard(boardId, id, cardId, () => navigate(cardId + "?new")));
	};


	cards.sort((a, b) => a.order - b.order);

	return (
		<Droppable droppableId={id}>{provided => (
			<div style={{order}} ref={provided.innerRef} {...provided.droppableProps}>
				<ListContainer>
					<Title>{title}</Title>

					<InnerContainer>
						{cards.map((card, idx) => <Card key={card.id} users={users} boardId={boardId} idx={idx} {...card}/>)}
						{provided.placeholder}
					</InnerContainer>

					<Text onClick={addCard}>+ Add card</Text>
				</ListContainer>
			</div>
		)}</Droppable>
	);
};

export default List;