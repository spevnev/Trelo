import React, {useRef, useState} from "react";
import styled from "styled-components";
import bundle from "../../services";

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
	const [preview, setPreview] = useState(null);
	const input = useRef(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onFile({target: input.current});
		e.preventDefault();
	};

	const onFile = e => {
		const file = e.target.files[0];

		if (file) {
			if (file.size > 1024 * 1024) return error("Image is too big! Max size - 1 MB.");

			const reader = new FileReader();
			reader.readAsDataURL(file);
			if (file.name.split(".").length === 1) return;
			reader.onload = () => {
				setPreview(reader.result);
				setIcon(null);
				bundle.user.uploadIcon(reader.result).then(res => setIcon(res));
			};
		}
	};


	return (
		<>
			<Icon htmlFor="userIcon" image={preview} onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}/>
			<input ref={input} accept="image/jpeg,image/png" onChange={onFile} id="userIcon" type="file" style={{display: "none"}}/>
		</>
	);
};

export default UserIcon;