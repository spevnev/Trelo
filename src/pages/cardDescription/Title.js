import React from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, SubTitle} from "./styles";
import SelectInput from "../../components/SelectInput";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {changeCardTitle, reorderCard} from "../../redux/actionCreators/cardActionCreator";

const Select = styled(SelectInput)`
  border: none;
  background: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  width: fit-content;
`;

const Title = ({lists, listId, title, ids}) => {
	const dispatch = useDispatch();

	const onChange = e => dispatch(changeCardTitle(...ids, e.target.value));

	const onSelect = listId => dispatch(reorderCard(...ids, listId));

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