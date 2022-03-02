import React, {useEffect, useRef, useState} from "react";
import {Form, StyledButton, SubContainer, Text} from "./styles";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {signup} from "../../redux/actionCreators/userActionCreator";
import useKeyboard from "../../hooks/useKeyboard";
import {useNavigate} from "react-router";
import bundle from "../../services";
import CropOverlay from "./CropOverlay";
import PopUp from "../../components/PopUp";

const Button = styled(StyledButton)`
  background: #4040ff;
  color: #fff;
  border: none;
`;

const Icon = styled.label`
  display: block;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  cursor: pointer;
  margin: 2.5rem auto;
  transition: all 0.3s;
  background: ${props => props.image ? `url(${props.image})` : `#e0e0e0`};
  background-position: center;
  background-size: cover;

  &:hover {
    filter: brightness(90%);
  }
`;


const UserIcon = ({setIcon, error}) => {
	const input = useRef(null);
	const [isShown, setShown] = useState(false);
	const [isCropping, setCropping] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const file = e.target.files[0];
		e.target.value = null;

		if (file) {
			if (file.size > 1024 * 1024) return error("Image is too big! Max size - 1 MB.");

			const reader = new FileReader();
			reader.readAsDataURL(file);

			if (file.name.split(".").length === 1) return;
			reader.onload = () => {
				setImage(reader.result);
				setCropping(true);
			};
		}
	};

	const onSubmit = data => {
		setPreview(data);
		setShown(true);

		bundle.user.uploadIcon(data).then(res => {
			setIcon(res);
			setShown(false);
		});
	};


	return (
		<>
			<Icon htmlFor="userIcon" image={preview} onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}/>
			<input ref={input} accept="image/jpeg,image/png" onChange={onFile} id="userIcon" type="file" style={{display: "none"}}/>

			<CropOverlay isShown={isCropping} setCropping={setCropping} image={image} onSubmit={onSubmit}/>
			<PopUp isShown={isShown}>Uploading icon... It might take a few seconds.</PopUp>
		</>
	);
};

let timeout = null;
const SignupForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [msg, setMsg] = useState();
	const [formState, setFormState] = useState({username: "", password: "", confirm: ""});
	const [icon, setIcon] = useState("");

	const ref = useRef();
	useKeyboard({ref, key: "enter", cb: () => submit()});

	useEffect(() => () => clearTimeout(timeout), []);


	const changeForm = changes => setFormState({...formState, ...changes});

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
		if (icon.length === 0) return error("You must have icon!");

		dispatch(signup({...formState, icon, username: formState.username.toLowerCase()}, error, () => navigate("/")));
	};


	return (
		<SubContainer background="0079bf" colour="fff">
			<Text>Sign up</Text>
			<Text secondary>Don't have account yet?</Text>

			<Form ref={ref}>
				<UserIcon setIcon={setIcon} error={error}/>

				<Input placeholder="Username" onChange={e => changeForm({username: e.target.value})} value={formState.username}/>
				<Input type="password" placeholder="Password" onChange={e => changeForm({password: e.target.value})} value={formState.password}/>
				<Input type="password" placeholder="Confirm password" onChange={e => changeForm({confirm: e.target.value})} value={formState.confirm}/>

				<ErrorMessage fixedHeight>{msg}</ErrorMessage>

				<Button onClick={submit}>Sign up</Button>
			</Form>
		</SubContainer>
	);
};

export default SignupForm;