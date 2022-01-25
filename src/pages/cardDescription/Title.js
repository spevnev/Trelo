import React from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, SubTitle} from "./styles";
import SelectInput from "../../components/SelectInput";
import styled from "styled-components";

const Select = styled(SelectInput)`
  border: none;
  background: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  width: fit-content;
`;

const Title = ({lists, listId, title, commitChanges}) => {
	const onChange = e => commitChanges({title: e.target.value});

	const onSelect = listId => commitChanges({listId});

	const curList = lists.filter(cur => cur.id === listId)[0];
	const otherLists = lists.filter(cur => cur.id !== listId);

	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput placeholder="Card title" onChange={onChange} value={title}/>
			<Select onSelect={onSelect} initial={{text: curList.title, value: listId}} options={otherLists.map(cur => ({text: cur.title, value: cur.id}))}/>
		</Container>
	);
};

export default Title;