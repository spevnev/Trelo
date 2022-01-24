import React, {useState} from "react";
import {Form, StyledButton, SubContainer, Text} from "./styles";
import UserIcon from "./UserIcon";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";

const SignupForm = () => {
	const [error, setError] = useState();
	const [formState, setFormState] = useState({username: "", password: "", confirm: "", icon: ""});

	const setIcon = (icon) => setFormState({...formState, icon});

	const submit = () => {

	};

	return (
		<SubContainer colour="c0c0c0">
			<Text>Sign up</Text>
			<Text secondary>Don't have account yet?</Text>

			<Form>
				<UserIcon setIcon={setIcon} icon={formState.icon}/>

				<Input placeholder="Username" onChange={e => setFormState({...formState, username: e.target.value})} value={formState.username}/>
				<Input placeholder="Password" onChange={e => setFormState({...formState, password: e.target.value})} value={formState.password}/>
				<Input placeholder="Confirm password" onChange={e => setFormState({...formState, confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage>{error}</ErrorMessage>

				<StyledButton primary onClick={submit}>Sign up</StyledButton>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;