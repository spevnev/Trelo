import React, {useContext, useRef, useState} from "react";
import styled from "styled-components";
import {Container, SubTitle} from "./styles";
import trashCursor from "../../assets/cursor.cur";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import useKeyboard from "../../hooks/useKeyboard";
import {CardContext} from "./index";

const User = styled.img`
  width: 30px;
  height: 30px;
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
  max-width: 400px;
  width: 95vw;
  margin: 2px 0;

  & ${Input} {
    max-width: 300px;
    width: 70vw;
    font-size: 16px;
  }

  & ${Button} {
    font-size: 16px;
  }
`;


const AddUser = ({addUser}) => {
	const [name, setName] = useState("");
	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => newUser()});


	const newUser = () => {
		addUser(name.toLowerCase());
		setName("");
	};


	return (
		<AddUserContainer>
			<Input ref={ref} placeholder="Username" maxLength={25} onChange={e => setName(e.target.value)} value={name}/>
			<Button onClick={newUser}>Add</Button>
		</AddUserContainer>
	);
};

const Assigned = () => {
	const {state, board, setState} = useContext(CardContext);
	const [msg, setMsg] = useState(null);
	const assigned = board.users.filter(cur => state.assigned.indexOf(cur.username) !== -1);


	const addUser = username => {
		if (username.length < 4) return setMsg("Username must be at least 4 characters long!");
		if (board.users.filter(cur => cur.username === username).length === 1 && assigned.filter(cur => cur.username === username).length === 0)
			return setState({assigned: [...state.assigned, username]});

		setMsg("There is no user with that name in this project!");
		setTimeout(() => setMsg(null), 2000);
	};

	const deleteUser = username => setState({assigned: state.assigned.filter(cur => cur !== username)});


	return (
		<Container>
			<SubTitle>Assigned</SubTitle>

			<div>{assigned.map(user =>
				<User onClick={() => deleteUser(user.username)} key={user.username} title={user.username} src={user.icon}/>,
			)}</div>

			<ErrorMessage>{msg}</ErrorMessage>
			<AddUser addUser={addUser}/>
		</Container>
	);
};

export default Assigned;