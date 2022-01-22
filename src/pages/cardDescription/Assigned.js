import React, {useState} from "react";
import styled from "styled-components";

import {Container, SubTitle} from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

const User = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 5px;
`;

const AddUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 35rem;
  margin: 2px 0;

  & ${Input} {
    width: 25rem;
    font-size: 1.6rem;
  }

  & ${Button} {
    font-size: 1.6rem;
  }
`;

const AddUser = () => {
	const [name, setName] = useState("");

	const onChange = e => setName(e.target.value);

	return (
		<AddUserContainer>
			<Input placeholder="Username" maxLength={20} onChange={onChange} value={name}/>
			<Button>Add</Button>
		</AddUserContainer>
	);
};

const Assigned = () => {
	return (
		<Container>
			<SubTitle>Assigned</SubTitle>
			<div>
				<User src="https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"/>
				<User src="https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png"/>
			</div>
			<AddUser/>
		</Container>
	);
};

export default Assigned;