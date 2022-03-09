import React, {useContext} from "react";
import styled from "styled-components";
import {Container, SubTitle} from "./styles";
import {CardContext} from "./index";
import Textarea from "react-textarea-autosize";
import schema from "../../schema";

const DescriptionInput = styled(Textarea)`
  background: #f4f4f4;
  border: none;
  border-radius: 8px;
  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
  outline: none;
  width: 100%;
  min-height: 100px;
  padding: 6px 12px;
  font-size: 18px;
  resize: none;
  transition: background-color .3s;

  &:hover, &:focus {
    background: #fbfbfb;
  }
`;


const Description = () => {
	const {setState, state} = useContext(CardContext);


	return (
		<Container>
			<SubTitle>Description</SubTitle>
			<DescriptionInput maxRows="10" minRows="4" maxLength={schema.description.max}
							  onChange={e => setState({description: e.target.value})} value={state.description}
							  placeholder="Description"/>
		</Container>
	);
};

export default Description;