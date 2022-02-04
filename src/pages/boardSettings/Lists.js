import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {deleteCardsInList} from "../../redux/actionCreators/cardActionCreator";
import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {v4 as uuid} from "uuid";

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


const ListEl = ({title, id, deleteEl, changeEl}) => (
	<ListElContainer>
		<HiddenInput fontSize="2rem" placeholder="List title" onChange={e => changeEl(id, e.target.value)} value={title} maxLength={20}/>
		<Cancel onClick={() => deleteEl(id)}>&#x2716;</Cancel>
	</ListElContainer>
);

const Lists = ({lists, boardId, setState}) => {
	const [newList, setNewList] = useState("");
	const dispatch = useDispatch();


	const addEl = () => {
		setNewList("");
		setState({lists: [...lists, {title: newList, id: uuid()}]});
	};

	const deleteEl = listId => {
		setState({lists: lists.filter(cur => cur.id !== listId)});
		dispatch(deleteCardsInList(boardId, listId));
	};

	const changeEl = (listId, title) => setState({lists: lists.map(cur => cur.id === listId ? {...cur, title} : cur)});


	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			{lists.map(cur => <ListEl key={cur.id} {...cur} deleteEl={deleteEl} changeEl={changeEl}/>)}

			<NewList>
				<Input placeholder="List title" maxLength={20} onChange={e => setNewList(e.target.value)} value={newList}/>
				<Button onClick={addEl}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;