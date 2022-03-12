import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/StyledInput";
import Button from "../../components/Button";
import SelectInput from "../../components/SelectInput";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {Leave} from "../../redux/thunkActionCreators/userActionCreator";
import {getUser} from "../../redux/selectors";
import {useNavigate} from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import {AddUser, ChangeUserRole, DeleteUser} from "../../redux/thunkActionCreators/boardActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import schema, {validateUsername} from "../../schema";
import config from "../../config";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;

  & p {
    font-size: 18px;
    margin-left: 5px;
  }

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & ${Cancel} {
    margin-left: 50px;
  }
`;

const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px 0;
`;

const NewUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 400px;
  width: 95vw;
  margin-top: 10px;

  & ${Input} {
    max-width: 300px;
    width: 70vw;
  }
`;

const Username = styled.p`
  font-size: 18px;
  text-transform: capitalize;
`;


const user = {value: "user", text: "User"};
const owner = {value: "owner", text: "Owner"};
const User = ({username, icon, isOwner, deleteUser, changeRole}) => (
	<UserContainer style={{order: isOwner ? 1 : 0}}>
		<div>
			<UserIcon src={icon}/>
			<Username>{username}</Username>
		</div>

		<div>
			<SelectInput onSelect={val => changeRole(username, val)}
						 initialOption={isOwner ? owner : user} options={isOwner ? [user] : [owner]}/>
			<Cancel onClick={() => deleteUser(username)}>&#x2716;</Cancel>
		</div>
	</UserContainer>
);

const CurUser = ({username, icon, isOwner, leave}) => (
	<UserContainer style={{order: isOwner ? 1 : 0}}>
		<div>
			<UserIcon src={icon}/>
			<Username>{username}</Username>
		</div>

		<div>
			<p>{isOwner ? owner.text : user.text}</p>
			<Cancel onClick={leave}>&#x2716;</Cancel>
		</div>
	</UserContainer>
);

let timeout = null;
const Users = ({users = [], boardId, setState, openModal}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const curUser = useSelector(getUser()) || {boards: []};
	const [errorMsg, setErrorMsg] = useState();
	const [newUsername, setNewUsername] = useState("");
	const inputRef = useRef();

	useKeyboard({ref: inputRef, key: "enter", cb: () => newUser()});

	useEffect(() => () => clearTimeout(timeout), []);


	const numOfOwners = users.filter(user => user.isOwner).length;

	const displayError = errorMsg => {
		setErrorMsg(errorMsg);
		timeout = setTimeout(() => setErrorMsg(null), config.ERROR_DURATION_MS);
	};

	const changeUserRole = (username, role) => {
		const isOwner = role === "owner";

		// Only owners can access this page, so if there's only 1 owner it is the user
		if (!isOwner && numOfOwners === 1) return;

		dispatch(ChangeUserRole(boardId, username, isOwner));
	};

	const delUser = username => {
		setState({users: users.filter(user => user.username !== username)});
		dispatch(DeleteUser(boardId, username));
	};

	const leave = () => {
		if (users.length === 1 || numOfOwners === 1) return openModal();

		dispatch(Leave(boardId));
		navigate("/");
	};

	const newUser = () => {
		if (!validateUsername(newUsername, displayError)) return;
		if (users.filter(user => user.username === newUsername.toLowerCase()).length > 0) return displayError("This user is already in the board!");

		setNewUsername("");
		dispatch(AddUser(boardId, newUsername.toLowerCase(), data => setState({users: [...users, {...data, isOwner: false}]}), displayError));
	};


	const board = curUser.boards.filter(board => board.id === boardId);
	const otherUsers = users.filter(user => user.username !== curUser.username);

	return (
		<SubContainer>
			<SubTitle>Users</SubTitle>

			<CurUser leave={leave} username={curUser.username} icon={curUser.icon} isOwner={board.length === 1 ? board[0].isOwner : false}/>
			{otherUsers.map(user => <User key={user.username} deleteUser={delUser} changeRole={changeUserRole} {...user}/>)}

			<ErrorMessage>{errorMsg}</ErrorMessage>

			<NewUser>
				<Input ref={inputRef} maxLength={schema.username.max} placeholder="Username"
					   value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
				<Button onClick={newUser}>Add</Button>
			</NewUser>
		</SubContainer>
	);
};

export default Users;