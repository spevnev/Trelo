import React from "react";
import HiddenInput from "../../components/HiddenInput";
import {SubContainer, SubTitle} from "./styles";
import schema from "../../schema";

const Title = ({title = "", titleChange}) => (
	<SubContainer>
		<SubTitle>Title</SubTitle>
		<HiddenInput maxLength={schema.boardTitle.max} placeholder="Board title"
					 onChange={e => titleChange(e.target.value)} value={title}/>
	</SubContainer>
);

export default Title;