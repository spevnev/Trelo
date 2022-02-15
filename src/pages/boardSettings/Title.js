import React from "react";
import HiddenInput from "../../components/HiddenInput";
import {SubContainer, SubTitle} from "./styles";

const Title = ({title, titleChange}) => (
	<SubContainer>
		<SubTitle>Title</SubTitle>
		<HiddenInput maxLength="20" placeholder="Board title" onChange={e => titleChange(e.target.value)} value={title}/>
	</SubContainer>
);

export default Title;