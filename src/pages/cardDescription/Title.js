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
	const curList = lists.filter(cur => cur.id === listId)[0];
	const otherLists = lists.filter(cur => cur.id !== listId);

	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput maxLength="64" placeholder="Card title" onChange={e => commitChanges({title: e.target.value})} value={title}/>
			<Select onSelect={listId => commitChanges({listId})} initial={{text: curList.title, value: listId}}
					options={otherLists.map(cur => ({text: cur.title, value: cur.id}))}/>
		</Container>
	);
};

export default Title;