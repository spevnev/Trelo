import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {v4 as uuid} from "uuid";
import {deleteCardsInList} from "../../redux/actionCreators/cardActionCreator";
import {addList, changeListTitle, deleteList} from "../../redux/actionCreators/boardActionCreator";
import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Cancel, SubContainer, SubTitle} from "./styles";

const ListElContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 35rem;
  width: 95vw;
  
  & ${HiddenInput} {
    font-size: 2rem;
  }
`;

const ListEl = ({title, id, deleteEl, changeEl}) => {
	return (
		<ListElContainer>
			<HiddenInput fontSize="2rem" placeholder="List title" onChange={e => changeEl(id, e.target.value)} value={title} maxLength={20}/>
			<Cancel onClick={() => deleteEl(id)}>&#x2716;</Cancel>
		</ListElContainer>
	);
};

const NewList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  max-width: 35rem;
  width: 95vw;

  & ${Input} {
    max-width: 25rem;
    width: 70vw;
  }
`;

const Lists = ({lists, boardId}) => {
	const [newList, setNewList] = useState("");
	const dispatch = useDispatch();

	const addEl = () => {
		setNewList("");
		dispatch(addList(boardId, {title: newList, id: uuid()}));
	};

	const deleteEl = (listId) => {
		dispatch(deleteList(boardId, listId));
		dispatch(deleteCardsInList(boardId, listId));
	};

	const changeEl = (listId, title) => dispatch(changeListTitle(boardId, listId, title));

	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			{lists.map(cur =>
				<ListEl key={cur.id} {...cur} deleteEl={deleteEl} changeEl={changeEl}/>,
			)}

			<NewList>
				<Input placeholder="List title" maxLength={20} onChange={e => setNewList(e.target.value)} value={newList}/>
				<Button onClick={addEl}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;