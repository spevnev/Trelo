import React, {useEffect, useState} from "react";
import HiddenInput from "../../components/HiddenInput";
import {SubContainer, SubTitle} from "./styles";

let timeout = null;
const Title = ({titleProp, titleChange}) => {
	const [title, setTitle] = useState(titleProp || "");

	useEffect(() => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => titleChange(title), 500);
	}, [title]);

	return (<SubContainer>
		<SubTitle>Title</SubTitle>
		<HiddenInput placeholder="Board title" onChange={e => setTitle(e.target.value)} value={title}/>
	</SubContainer>);
};

export default Title;