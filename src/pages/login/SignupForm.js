import React, {useEffect, useState} from "react";
import {Form, StyledButton, SubContainer, Text} from "./styles";
import UserIcon from "./UserIcon";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import {useDispatch} from "react-redux";
import {signup} from "../../redux/actionCreators/userActionCreator";

let timeout = null;
const SignupForm = () => {
	const dispatch = useDispatch();
	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: "", confirm: "", icon: ""});

	useEffect(() => () => clearTimeout(timeout), []);


	const setIcon = icon => setFormState({...formState, icon});

	const error = text => {
		setMsg(text);
		timeout = setTimeout(() => setMsg(null), 3000);
	};

	const submit = () => {
		if (formState.username.length < 4) return error("Username can't be less than 4 characters!");
		if (formState.password.length < 4) return error("Password can't be less than 4 characters!");
		if (formState.password != formState.confirm) return error("Passwords don't match!");
		if (formState.icon.ext.length === 0) return error("You must have icon!");

		dispatch(signup({...formState, username: formState.username.toLowerCase()}, error));
	};


	return (
		<SubContainer colour="c0c0c0">
			<Text>Sign up</Text>
			<Text secondary>Don't have account yet?</Text>

			<Form>
				<UserIcon setIcon={setIcon} icon={formState.icon.data} error={error}/>

				<Input placeholder="Username" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input placeholder="Password" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>
				<Input placeholder="Confirm password" onChange={e => setFormState({...formState, confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage>{msg}</ErrorMessage>

				<StyledButton primary onClick={submit}>Sign up</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;