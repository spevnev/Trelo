import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/StyledInput";
import Button from "../../components/Button";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {v4 as uuid} from "uuid";
import Modal from "../../components/Modal";
import {createList, deleteList} from "../../redux/actionCreators/boardActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import dragIcon from "../../assets/svg/drag-indicator.svg";
import schema from "../../schema";

const ListElContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
  width: 95vw;

  & ${HiddenInput} {
    width: 300px;
    font-size: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  max-width: 400px;
  width: 95vw;

  & ${Input} {
    max-width: 300px;
    width: 70vw;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const ListEl = ({title, id, order, deleteEl, changeEl, dragProps}) => (
	<ListElContainer style={{order}}>
		<HiddenInput fontSize="20px" placeholder="List title" onChange={e => changeEl(id, e.target.value)} value={title} maxLength={schema.listTitle.max}/>

		<Row>
			<Icon src={dragIcon} {...dragProps}/>
			<Modal onContinue={() => deleteEl(id)} text="If you delete this list, all cards in it will be deleted too!">
				<Cancel>&#x2716;</Cancel>
			</Modal>
		</Row>
	</ListElContainer>
);

const Lists = ({lists, boardId, setState}) => {
	const [newList, setNewList] = useState("");
	const dispatch = useDispatch();

	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => addEl()});


	const addEl = () => {
		setNewList("");
		dispatch(createList(boardId, uuid(), newList));
	};

	const deleteEl = listId => dispatch(deleteList(boardId, listId));

	const changeEl = (listId, title) => setState({lists: lists.map(cur => cur.id === listId ? {...cur, title} : cur)});

	const onDragEnd = e => {
		const srcInd = e.source.index;
		const dstInd = e.destination.index;
		const listId = e.draggableId;

		setState({
			lists: lists.map(cur => {
				if (cur.id === listId) return {...cur, order: dstInd};
				if (srcInd > dstInd && cur.order < srcInd && cur.order >= dstInd) return {...cur, order: cur.order + 1};
				if (cur.order > srcInd && cur.order <= dstInd) return {...cur, order: cur.order - 1};
				return cur;
			}),
		});
	};


	if (!lists) return null;

	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			<DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="id">{provided => (
				<Column ref={provided.innerRef} {...provided.droppableProps}>
					{lists.sort((a, b) => a.order - b.order).map((cur, idx) => (
						<Draggable draggableId={cur.id} key={cur.id} index={idx}>{provided =>
							<div ref={provided.innerRef} {...provided.draggableProps}>
								<ListEl {...cur} dragProps={provided.dragHandleProps} deleteEl={deleteEl} changeEl={changeEl}/>
							</div>
						}</Draggable>
					))}

					{provided.placeholder}
				</Column>
			)}</Droppable></DragDropContext>

			<NewList>
				<Input ref={ref} placeholder="List title" maxLength={schema.listTitle.max} onChange={e => setNewList(e.target.value)} value={newList}/>
				<Button onClick={addEl}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;