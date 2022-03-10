import React, {useContext, useRef} from "react";
import styled from "styled-components";
import {Container, Select, SubTitle} from "./styles";
import {CardContext} from "./index";

const User = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;


const Assigned = () => {
	const {state, board, setState} = useContext(CardContext);
	const selectInputRef = useRef();


	const assigned = board.users.filter(user => state.assigned.indexOf(user.username) !== -1);

	const capitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1);

	const composeUsername = (user, assigned) => `${capitalizeString(user.username)}${assigned.filter(assigned => assigned.username === user.username).length === 0 ? " - ✓" : " - ✘"}`;

	const addUser = username => setState({assigned: [...state.assigned, username]});

	const deleteUser = username => setState({assigned: state.assigned.filter(user => user !== username)});

	const onSelect = username => {
		selectInputRef.current.value = defaultOption.value;
		if (username === defaultOption.value) return;

		if (assigned.filter(user => user.username === username).length === 1) deleteUser(username);
		else addUser(username);
	};


	const defaultOption = {text: "Username", value: "d"};
	const userOptions = board.users.map(user => ({text: composeUsername(user, assigned), value: user.username}));

	return (
		<Container>
			<SubTitle>Assigned</SubTitle>

			<div>{assigned.map(user => <User key={user.username} title={user.username} src={user.icon}/>)}</div>

			<Select ref={selectInputRef} onSelect={onSelect} initialOption={defaultOption} options={userOptions}/>
		</Container>
	);
};

export default Assigned;