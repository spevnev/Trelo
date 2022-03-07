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


const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const composeUsername = (user, assigned) => `${capitalize(user.username)}${assigned.filter(cur => cur.username === user.username).length === 0 ? " - ✓" : " - ✘"}`;

const Assigned = () => {
	const {state, board, setState} = useContext(CardContext);
	const ref = useRef();

	const assigned = board.users.filter(cur => state.assigned.indexOf(cur.username) !== -1);


	const addUser = username => setState({assigned: [...state.assigned, username]});

	const deleteUser = username => setState({assigned: state.assigned.filter(cur => cur !== username)});

	const onSelect = username => {
		ref.current.value = "d";
		if (username === "d") return;

		if (assigned.filter(cur => cur.username === username).length === 1) deleteUser(username);
		else addUser(username);
	};


	return (
		<Container>
			<SubTitle>Assigned</SubTitle>

			<div>{assigned.map(user => <User key={user.username} title={user.username} src={user.icon}/>)}</div>

			<Select ref={ref} onSelect={onSelect} initial={{text: "Username", value: "d"}}
					options={board.users.map(user => ({text: composeUsername(user, assigned), value: user.username}))}/>
		</Container>
	);
};

export default Assigned;