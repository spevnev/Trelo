import React, {useContext} from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, SubTitle} from "./styles";
import SelectInput from "../../components/SelectInput";
import styled from "styled-components";
import {CardContext} from "./index";

const Select = styled(SelectInput)`
  border: none;
  background: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  width: fit-content;
`;


const Title = () => {
	const {board, state, setState} = useContext(CardContext);


	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput maxLength="64" placeholder="Card title" onChange={e => setState({title: e.target.value})} value={state.title}/>
			<Select onSelect={listId => setState({listId})}
					initial={{text: board.lists.filter(cur => cur.id === state.listId)[0].title, value: state.listId}}
					options={board.lists.filter(cur => cur.id !== state.listId).map(cur => ({text: cur.title, value: cur.id}))}/>
		</Container>
	);
};

export default Title;