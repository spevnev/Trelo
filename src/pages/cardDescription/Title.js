import React from "react";
import HiddenInput from "../../components/HiddenInput";

import {Container, SubTitle} from "./styles";

const Title = ({title, onChange}) => {
	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput placeholder="Card title" onChange={onChange} value={title}/>
		</Container>
	);
};

export default Title;