import React, {useState} from "react";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";
import {Container, SubTitle} from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

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

const AddUser = ({addUser}) => {
	const [name, setName] = useState("");

	const onChange = e => setName(e.target.value);

	const newUser = () => {
		addUser(name);
		setName("");
	};

	return (
		<AddUserContainer>
			<Input placeholder="Username" maxLength={20} onChange={onChange} value={name}/>
			<Button onClick={newUser}>Add</Button>
		</AddUserContainer>
	);
};

const User = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 5px;
`;

const Assigned = ({assigned, users, addAssigned}) => {
	const [msg, setMsg] = useState(null);

	const addUser = username => {
		const user = users.filter(cur => cur.username === username);
		if (user.length === 1) return addAssigned(user);

		setMsg("There is no user with that name in this project!");
		setTimeout(() => setMsg(null), 1000);
	};

	return (
		<Container>
			<SubTitle>Assigned</SubTitle>
			<div>
				{assigned.map(user => <User src={user.icon} key={user.username} title={user.username}/>)}
			</div>
			<ErrorMessage>{msg}</ErrorMessage>
			<AddUser addUser={addUser}/>
		</Container>
	);
};

export default Assigned;