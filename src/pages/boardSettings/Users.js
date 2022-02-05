import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import SelectInput from "../../components/SelectInput";
import {Cancel, SubContainer, SubTitle} from "./styles";
import {addUser, changeBoards, deleteUser} from "../../redux/actionCreators/userActionCreator";
import {getUser} from "../../redux/selectors";
import {useNavigate} from "react-router";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 35rem;

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
  max-width: 35rem;
  width: 95vw;
  margin-top: 10px;

  & ${Input} {
    max-width: 25rem;
    width: 70vw;
  }
`;


const user = {value: "user", text: "User"};
const owner = {value: "owner", text: "Owner"};

const User = ({username, userIcon, isOwner, deleteUser, changeRole}) => (
	<UserContainer style={{order: isOwner ? 1 : 0}}>
		<div>
			<UserIcon src={userIcon}/>
			<p>{username}</p>
		</div>

		<div>
			<SelectInput onSelect={val => changeRole(username, val)} initial={isOwner ? owner : user} options={isOwner ? [user] : [owner]}/>
			<Cancel onClick={() => deleteUser(username)}>&#x2716;</Cancel>
		</div>
	</UserContainer>
);

const CurUser = ({username, userIcon, isOwner, leave}) => (
	<UserContainer style={{order: isOwner ? 1 : 0}}>
		<div>
			<UserIcon src={userIcon}/>
			<p>{username}</p>
		</div>

		<div>
			<h2>{isOwner ? owner.text : user.text}</h2>
			<Cancel onClick={leave}>&#x2716;</Cancel>
		</div>
	</UserContainer>
);

const Users = ({users, boardId, setState, open}) => {
	const [newUsername, setNewUsername] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const curUser = useSelector(getUser());


	const changeRole = (username, role) => {
		if (role !== "owner" && users.filter(cur => cur.isOwner).length === 1) return;
		setState({users: users.map(cur => cur.username === username ? {...cur, isOwner: role === "owner"} : cur)});
	};

	const delUser = username => {
		setState({users: users.filter(cur => cur.username !== username)});
		dispatch(deleteUser(boardId, username));
	};

	const leave = () => {
		if (users.length === 1) return open();

		setState({users: users.filter(cur => cur.username !== curUser.username)});
		dispatch(changeBoards(curUser.boards.filter(cur => cur.id !== boardId)));
		navigate("/");
	};

	const newUser = () => {
		if (users.filter(cur => cur.username === newUsername).length !== 0) return;

		dispatch(addUser(boardId, newUsername, () => {
			setState({users: [...users, {username: newUsername, isOwner: false}]});
			setNewUsername("");
		}));
	};


	const board = curUser.boards.filter(cur => cur.id === boardId);

	return (
		<SubContainer>
			<SubTitle>Users</SubTitle>

			<CurUser leave={leave} username={curUser.username} userIcon={curUser.userIcon} isOwner={board.length === 1 ? board[0].isOwner : false}/>
			{users.filter(cur => cur.username !== curUser.username).map(cur => <User key={cur.username} deleteUser={delUser} changeRole={changeRole} {...cur}/>)}

			<NewUser>
				<Input maxLength={20} placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
				<Button onClick={newUser}>Add</Button>
			</NewUser>
		</SubContainer>
	);
};

export default Users;