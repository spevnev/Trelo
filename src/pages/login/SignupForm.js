import React, {useEffect, useRef, useState} from "react";
import {Form, StyledButton, SubContainer, Text} from "./styles";
import UserIcon from "./UserIcon";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {signup} from "../../redux/actionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {useNavigate} from "react-router";

const Button = styled(StyledButton)`
  background: #4040ff;
  color: #fff;
  border: none;
`;

let timeout = null;
const SignupForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: "", confirm: "", icon: ""});

	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const setIcon = icon => setFormState({...formState, icon});

	const error = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (formState.username.length < 4) return error("Username can't be less than 4 characters!");
		if (formState.username.length > 25) return error("Username can't be longer than 25 characters!");
		if (formState.password.length < 4) return error("Password can't be less than 4 characters!");
		if (formState.password.length > 64) return error("Password can't be longer than 64 characters!");
		if (formState.password != formState.confirm) return error("Passwords don't match!");
		if (formState.icon.length === 0) return error("You must have icon!");

		dispatch(signup({...formState, username: formState.username.toLowerCase()}, error, () => navigate("/")));
	};


	return (
		<SubContainer background="0079bf" colour="fff">
			<Text>Sign up</Text>
			<Text secondary>Don't have account yet?</Text>

			<Form ref={ref}>
				<UserIcon setIcon={setIcon} error={error}/>

				<Input placeholder="Username" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input type="password" placeholder="Password" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>
				<Input type="password" placeholder="Confirm password" onChange={e => setFormState({...formState, confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage fixedHeight>{msg}</ErrorMessage>

				<Button onClick={submit}>Sign up</Button>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;