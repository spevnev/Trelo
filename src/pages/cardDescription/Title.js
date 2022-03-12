import React, {useContext} from "react";
import HiddenInput from "../../components/HiddenInput";
import {Container, SubTitle} from "./styles";
import {CardContext} from "./index";
import schema from "../../schema";
import Location from "./Location";


const Title = () => {
	const {state, setState} = useContext(CardContext);


	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput maxLength={schema.cardTitle.max} placeholder="Card title" onChange={e => setState({title: e.target.value})} value={state.title}/>
			<Location/>
		</Container>
	);
};

export default Title;