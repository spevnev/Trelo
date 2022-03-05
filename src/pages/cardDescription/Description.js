import React, {useContext} from "react";
import styled from "styled-components";
import {Container, SubTitle} from "./styles";
import {CardContext} from "./index";
import Textarea from "react-textarea-autosize";

const DescriptionInput = styled(Textarea)`
  background: #f4f4f4;
  border: none;
  border-radius: 8px;
  box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.3);
  outline: none;
  width: 100%;
  min-height: 10rem;
  padding: .6rem 1.2rem;
  font-size: 1.8rem;
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
			<DescriptionInput maxRows="10" minRows="4" maxLength="2000"
							  onChange={e => setState({description: e.target.value})} value={state.description}
							  placeholder="Description"/>
		</Container>
	);
};

export default Description;