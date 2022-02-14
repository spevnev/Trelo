import React, {useState} from "react";
import styled from "styled-components";
import {Container, SubTitle} from "./styles";
import trashCursor from "../../assets/cursor.cur";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

const User = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 5px;
  cursor: url(${trashCursor}), pointer;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
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


const AddUser = ({addUser}) => {
	const [name, setName] = useState("");


	const newUser = () => {
		addUser(name);
		setName("");
	};


	return (
		<AddUserContainer>
			<Input placeholder="Username" maxLength={20} onChange={e => setName(e.target.value)} value={name}/>
			<Button onClick={newUser}>Add</Button>
		</AddUserContainer>
	);
};

const Assigned = ({assignedNames, users, commitChanges}) => {
	const [msg, setMsg] = useState(null);
	const assigned = users.filter(cur => assignedNames.indexOf(cur.username) !== -1);


	const addUser = username => {
		if (users.filter(cur => cur.username === username).length === 1 && assigned.filter(cur => cur.username === username).length === 0)
			return commitChanges({assigned: [...assignedNames, username]});

		setMsg("There is no user with that name in this project!");
		setTimeout(() => setMsg(null), 2000);
	};

	const deleteUser = username => commitChanges({assigned: assignedNames.filter(cur => cur !== username)});


	return (
		<Container>
			<SubTitle>Assigned</SubTitle>

			<div>
				{assigned.map(user =>
					<User onClick={() => deleteUser(user.username)}
						  src={(user.icon && user.icon.id && user.icon.ext) && `http://localhost:3000/static/icons/${user.icon.id}.${user.icon.ext}`}
						  key={user.username} title={user.username}/>,
				)}
			</div>

			<ErrorMessage>{msg}</ErrorMessage>
			<AddUser addUser={addUser}/>
		</Container>
	);
};

export default Assigned;