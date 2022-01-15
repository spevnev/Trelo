import React, {useState} from "react";
import styled from "styled-components";

const Icon = styled.label`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  margin: 25px auto;
  transition: all 0.3s;
  background: ${props => props.image ? `url(${props.image})` : `#e0e0e0`};
  background-position: center;
  background-size: cover;

  &:hover {
    filter: brightness(90%);
  }
`;

const UserIcon = () => {
	const [image, setImage] = useState(null);

	const onFile = e => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => setImage(reader.result);
		}
	};

	return (
		<>
			<Icon htmlFor="userIcon" image={image}/>
			<input accept="image/jpeg,image/png" onChange={onFile} id="userIcon" type="file" style={{display: "none"}}/>
		</>
	);
};

export default UserIcon;