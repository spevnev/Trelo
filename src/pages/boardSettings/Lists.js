import React, {useState} from "react";
import styled from "styled-components";

import HiddenInput from "../../components/HiddenInput";
import Input from "../../components/Input";
import Button from "../../components/Button";

import {Cancel, SubContainer, SubTitle} from "./styles";

const ListElContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 40rem;
`;

const NewList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
  width: 40rem;

  & ${Input} {
    width: 30rem;
  }
`;

const ListEl = ({title, id, onChange}) => {
	return (
		<ListElContainer>
			<HiddenInput fontSize="2rem" placeholder="List title" onChange={e => onChange(id, e)} value={title} maxLength={20}/>
			<Cancel onClick={() => onChange(id, null)}>&#x2716;</Cancel>
		</ListElContainer>
	);
};

const Lists = () => {
	const [listEls, setListEls] = useState([{id: 1, title: "First list el"}, {id: 2, title: "Second list el"}]);
	const [newList, setNewList] = useState("");

	const onChange = (id, e) => {
		if (e === null) {
			setListEls(listEls.filter(cur => cur.id !== id));
			return;
		}

		const newListEls = [...listEls];

		const el = newListEls.filter(cur => cur.id === id);

		if (el.length !== 1) return;

		el[0].title = e.target.value;
		setListEls(newListEls);
	};

	const addEl = () => {
		setNewList("");
		setListEls([...listEls, {title: newList, id: 3}]);
	};

	return (
		<SubContainer>
			<SubTitle>Lists</SubTitle>

			{listEls.map(cur =>
				<ListEl key={cur.id} {...cur} onChange={onChange}/>,
			)}

			<NewList>
				<Input placeholder="List title" maxLength={20} onChange={e => setNewList(e.target.value)} value={newList}/>
				<Button onClick={addEl}>Add</Button>
			</NewList>
		</SubContainer>
	);
};

export default Lists;