import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/StyledInput";
import Button from "../../components/Button";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {v4 as uuid} from "uuid";
import Modal from "../../components/Modal";
import {CreateList, DeleteList} from "../../redux/thunkActionCreators/boardActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import dragIcon from "../../assets/svg/drag-indicator.svg";
import schema from "../../schema";

const ListContainer = styled.div`
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


const List = ({title, id, order, deleteList, changeList, dragProps}) => (
	<ListContainer style={{order}}>
		<HiddenInput fontSize="20px" placeholder="List title" maxLength={schema.listTitle.max}
					 onChange={e => changeList(id, e.target.value)} value={title}/>
		<Row>
			<Icon src={dragIcon} {...dragProps}/>
			<Modal onContinue={() => deleteList(id)} text="If you delete this list, all cards in it will be deleted too!">
				<Cancel>&#x2716;</Cancel>
			</Modal>
		</Row>
	</ListContainer>
);

const Lists = ({lists = [], boardId, setState}) => {
	const dispatch = useDispatch();

	const [newListTitle, setNewListTitle] = useState("");
	const inputRef = useRef();

	useKeyboard({ref: inputRef, key: "enter", cb: () => addList()});


	const addList = () => {
		setNewListTitle("");
		dispatch(CreateList(boardId, uuid(), newListTitle));
	};

	const deleteList = listId => dispatch(DeleteList(boardId, listId));

	const changeList = (listId, title) => setState({lists: lists.map(list => list.id === listId ? {...list, title} : list)});

	const onDragEnd = e => {
		if (!e.destination) return;

		const srcInd = e.source.index;
		const dstInd = e.destination.index;
		const listId = e.draggableId;

		if (srcInd === dstInd) return;

		const isBetweenSrcAndDst = order => order > srcInd && order <= dstInd;
		const isBetweenDstAndSrc = order => order < srcInd && order >= dstInd;

		setState({
			lists: lists.map(list => {
				if (list.id === listId) return {...list, order: dstInd};
				if (srcInd > dstInd && isBetweenDstAndSrc(list.order)) return {...list, order: list.order + 1};
				if (isBetweenSrcAndDst(list.order)) return {...list, order: list.order - 1};

				return list;
			}),
		});
	};


	lists.sort((a, b) => a.order - b.order);

	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			<DragDropContext onDragEnd={onDragEnd}><Droppable droppableId="id">{provided => (
				<Column ref={provided.innerRef} {...provided.droppableProps}>
					{lists.map((list, idx) => (
						<Draggable draggableId={list.id} key={list.id} index={idx}>{provided =>
							<div ref={provided.innerRef} {...provided.draggableProps}>
								<List {...list} dragProps={provided.dragHandleProps} deleteList={deleteList} changeList={changeList}/>
							</div>
						}</Draggable>
					))}

					{provided.placeholder}
				</Column>
			)}</Droppable></DragDropContext>

			<NewList>
				<Input ref={inputRef} placeholder="List title" maxLength={schema.listTitle.max} onChange={e => setNewListTitle(e.target.value)} value={newListTitle}/>
				<Button onClick={addList}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;