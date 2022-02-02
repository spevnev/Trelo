import React from "react";
import HiddenInput from "../../components/HiddenInput";
import {SubContainer, SubTitle} from "./styles";

const Title = ({title, titleChange}) => {
	return (
		<SubContainer>
			<SubTitle>Title</SubTitle>
			<HiddenInput placeholder="Board title" onChange={e => titleChange(e.target.value)} value={title}/>
		</SubContainer>
	);
};

export default Title;