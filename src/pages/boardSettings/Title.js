import React, {useState} from "react";

import HiddenInput from "../../components/HiddenInput";

import {SubContainer, SubTitle} from "./styles";

const Title = () => {
	const [title, setTitle] = useState("Board title");

	const titleChange = e => setTitle(e.target.value);

	return (
		<SubContainer>
			<SubTitle>Title</SubTitle>
			<HiddenInput placeholder="Board title" onChange={titleChange} value={title}/>
		</SubContainer>
	);
};

export default Title;