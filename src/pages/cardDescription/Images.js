import React, {useRef, useState} from "react";
import styled from "styled-components";

import cross from "../../assets/svg/cross.svg";

import {Container, SubTitle} from "./styles";

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Block = styled.div`
  width: 20rem;
  height: 10rem;
  margin-right: 2rem;
  cursor: pointer;
  margin-bottom: 5px;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const Image = styled(Block)`
  background: url("${props => props.src}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const OverlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const OverlayImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  height: 100%;
  object-fit: contain;
`;

const Close = styled.img`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const AddImage = styled(Block)`
  display: flex;
  background: #eee;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

const Overlay = ({src, close}) => {
	return (
		<OverlayContainer>
			<Close src={cross} onClick={close}/>
			<OverlayImage src={src}/>
		</OverlayContainer>
	);
};

const Images = () => {
	const [fullImg, setFullImg] = useState(null);
	const input = useRef(null);

	const openFull = e => setFullImg(e.target.getAttribute("src"));

	const preventDefault = e => e.preventDefault();
	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onImage({target: input.current});
		e.preventDefault();
	};

	const onImage = e => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				// reader.result
			};
		}
	};

	return (
		<Container>
			<SubTitle>Attached images</SubTitle>
			{fullImg && <Overlay src={fullImg} close={() => setFullImg(null)}/>}
			<BlockContainer>
				<Image onClick={openFull} src="https://www.uedvision.com.ua/wp-content/uploads/2020/02/placeholder.png"/>
				<Image onClick={openFull} src="https://www.uedvision.com.ua/wp-content/uploads/2020/02/placeholder.png"/>

				<input ref={input} style={{display: "none"}} accept="image/jpeg,image/png" id="upload" type="file" onChange={onImage}/>
				<label htmlFor="upload"><AddImage onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>+</AddImage></label>
			</BlockContainer>
		</Container>
	);
};

export default Images;