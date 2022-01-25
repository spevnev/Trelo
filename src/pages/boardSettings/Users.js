import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addUser, changeUserRole, deleteUser} from "../../redux/actionCreators/boardActionCreator";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SelectInput from "../../components/SelectInput";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {deleteAssignedInCards} from "../../redux/actionCreators/cardActionCreator";

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

const editor = {value: "editor", text: "Editor"};
const owner = {value: "owner", text: "Owner"};
const User = ({username, userIcon, isOwner, deleteUser, changeRole}) => {
	return (
		<UserContainer>
			<div>
				<UserIcon src={userIcon}/>
				<p>{username}</p>
			</div>
			<div>
				<SelectInput onSelect={val => changeRole(username, val)} initial={isOwner ? owner : editor} options={isOwner ? [editor] : [owner]}/>
				<Cancel onClick={() => deleteUser(username)}>&#x2716;</Cancel>
			</div>
		</UserContainer>
	);
};

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

const Users = ({users, boardId}) => {
	const [newUsername, setNewUsername] = useState("");
	const dispatch = useDispatch();

	const changeRole = (username, role) => dispatch(changeUserRole(boardId, username, role === "owner"));

	const delUser = (username) => {
		dispatch(deleteUser(boardId, username));
		dispatch(deleteAssignedInCards(boardId, username));
	};

	const newUser = () => {
		setNewUsername("");
		dispatch(addUser(boardId, {username: newUsername, userIcon: "https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png", isOwner: false}));
	};

	return (
		<SubContainer>
			<SubTitle>Users</SubTitle>

			{users.map(cur => <User key={cur.username} deleteUser={delUser} changeRole={changeRole} {...cur}/>)}

			<NewUser>
				<Input maxLength={20} placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
				<Button onClick={newUser}>Add</Button>
			</NewUser>
		</SubContainer>
	);
};

export default Users;