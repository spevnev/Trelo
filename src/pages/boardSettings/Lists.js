import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {v4 as uuid} from "uuid";
import Modal from "../../components/Modal";
import {createList, deleteList} from "../../redux/actionCreators/boardActionCreator";
import useKeyboard from "../../hooks/useKeyboard";

const ListElContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 40rem;
  width: 95vw;

  & ${HiddenInput} {
    width: 30rem;
    font-size: 2rem;
  }
`;

const NewList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  max-width: 40rem;
  width: 95vw;

  & ${Input} {
    max-width: 30rem;
    width: 70vw;
  }
`;


const ListEl = ({title, id, deleteEl, changeEl}) => (
	<ListElContainer>
		<HiddenInput fontSize="2rem" placeholder="List title" onChange={e => changeEl(id, e.target.value)} value={title} maxLength="20"/>
		<Modal onContinue={() => deleteEl(id)} prompt="If you delete this list, all cards in it will be deleted too!">
			<Cancel>&#x2716;</Cancel>
		</Modal>
	</ListElContainer>
);

const Lists = ({lists, boardId, setState}) => {
	const [newList, setNewList] = useState("");
	const dispatch = useDispatch();

	const ref = useRef();
	useKeyboard([{ref, key: "enter", cb: () => addEl()}]);


	const addEl = () => {
		setNewList("");
		dispatch(createList(boardId, uuid(), newList));
	};

	const deleteEl = listId => dispatch(deleteList(boardId, listId));

	const changeEl = (listId, title) => setState({lists: lists.map(cur => cur.id === listId ? {...cur, title} : cur)});


	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			{lists.map(cur => <ListEl key={cur.id} {...cur} deleteEl={deleteEl} changeEl={changeEl}/>)}

			<NewList>
				<Input ref={ref} placeholder="List title" maxLength="20" onChange={e => setNewList(e.target.value)} value={newList}/>
				<Button onClick={addEl}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;