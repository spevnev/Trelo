import React, {useState} from "react";
import styled from "styled-components";

import Input from "../../components/Input";
import Button from "../../components/Button";
import SelectInput from "../../components/SelectInput";

import {Cancel, SubContainer, SubTitle} from "./styles";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 40rem;

  & p {
    font-size: 1.8rem;
    margin-left: 5px;
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & ${Cancel} {
    margin-left: 5rem;
  }
`;

const UserIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: .5rem 0;
`;

const NewUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40rem;
  margin-top: 10px;

  & ${Input} {
    width: 30rem;
  }
`;

const editor = {value: "editor", text: "Editor"};
const owner = {value: "owner", text: "Owner"};

const User = ({username, userIcon, isOwner, onSelect}) => {
	return (
		<UserContainer>
			<div>
				<UserIcon src={userIcon}/>
				<p>{username}</p>
			</div>
			<div>
				<SelectInput onSelect={val => onSelect(username, val)} initial={isOwner ? owner : editor} options={isOwner ? [editor] : [owner]}/>
				<Cancel onClick={() => onSelect(username, null)}>&#x2716;</Cancel>
			</div>
		</UserContainer>
	);
};

const Users = () => {
	const [users, setUsers] = useState([{username: "Username 1", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: true},
		{username: "Username 2", userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: false}]);
	const [newUser, setNewUser] = useState("");

	const onSelect = (username, val) => {
		if (val === null) {
			setUsers(users.filter(cur => cur.username !== username));
			return;
		}

		const newUsers = [...users];
		const el = newUsers.filter(cur => cur.username === username);

		if (el.length !== 1) return;
		el[0].isOwner = val === "owner";
		setUsers(newUsers);
	};

	const addUser = () => {
		setNewUser("");
		setUsers([...users, {username: newUser, userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: false}]);
	};

	return (
		<SubContainer>
			<SubTitle>Users</SubTitle>

			{users.map(cur => <User key={cur.username} onSelect={onSelect} {...cur}/>)}

			<NewUser>
				<Input maxLength={20} placeholder="Username" value={newUser} onChange={e => setNewUser(e.target.value)}/>
				<Button onClick={addUser}>Add</Button>
			</NewUser>
		</SubContainer>
	);
};

export default Users;