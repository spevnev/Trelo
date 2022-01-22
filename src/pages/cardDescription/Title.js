import React, {useState} from "react";
import HiddenInput from "../../components/HiddenInput";

import {Container, SubTitle} from "./styles";

const Title = () => {
	const [title, setTitle] = useState("");

	const onChange = e => setTitle(e.target.value);

	return (
		<Container>
			<SubTitle>Title</SubTitle>
			<HiddenInput placeholder="Card title" onChange={onChange} value={title}/>
		</Container>
	);
};

export default Title;