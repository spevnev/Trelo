import React, {useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import bundle from "../../services/api";
import useKeyboard from "../../hooks/useKeyboard";
import PopUp from "../../components/PopUp";
import {CardContext} from "./index";
import ScreenOverlay from "../../components/ScreenOverlay";
import schema from "../../schema";

const Block = styled.div`
  min-width: 200px;
  height: 100px;
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
`;

const OverlayContainer = styled(ScreenOverlay)`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayImage = styled.img`
  max-width: 80vw;
  max-height: 80vh;
  height: 100%;
  object-fit: contain;
`;

const Close = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const AddImage = styled(Block)`
  display: flex;
  background: #eee;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

const DropOverlay = styled(AddImage)`
  font-size: 18px;
  border: 2px dashed #000;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin: 2px;
  opacity: 0;
  transition: all .3s;
`;

const ImageContainer = styled(Block)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all .3s ease-in;

  &:hover ${Icon} {
    opacity: 1;
  }

  @media (pointer: coarse) {
    & ${Icon} {
      opacity: 1;
    }
  }

  @media (pointer: none) {
    & ${Icon} {
      opacity: 1;
    }
  }
`;


const Overlay = ({src, close}) => {
	const bodyRef = useRef(document.body);
	const imageRef = useRef(null);

	useKeyboard({ref: bodyRef, key: "escape", cb: close, priority: 1});


	return (
		<OverlayContainer onClick={e => e.target !== imageRef.current && close()}>
			<Close src={cross} onClick={close}/>
			<OverlayImage ref={imageRef} src={src}/>
		</OverlayContainer>
	);
};

const Image = ({openFull, url}) => {
	const {state, setState} = useContext(CardContext);


	const deleteImage = e => {
		e.stopPropagation();
		setState({images: state.images.filter(imageUrl => imageUrl !== url)});
	};

	const downloadImageLocal = e => {
		e.stopPropagation();
		bundle.fileAPI.downloadFile(url);
	};


	return (
		<ImageContainer onClick={openFull} src={url}>
			<Icon src={download} onClick={downloadImageLocal}/>
			<Icon src={cross} onClick={deleteImage}/>
		</ImageContainer>
	);
};

let stateVar = null;
const ImageInput = ({setIsUploading}) => {
	const {isOverlayVisible, state, board, setState} = useContext(CardContext);
	const input = useRef(null);

	useEffect(() => stateVar = state, [state]);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onImage({target: input.current});
		e.preventDefault();
	};

	const onImage = e => {
		const files = [...e.target.files].slice(0, 10 - state.images.length);

		const arr = [];
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.readAsDataURL(files[i]);

			setIsUploading(true);

			reader.onload = async () => {
				arr.push(reader.result);

				if (arr.length === files.length) {
					const [error, images] = await bundle.fileAPI.uploadFiles(board.id, arr);
					setIsUploading(false);

					if (error) return;
					setState({...stateVar, images: [...stateVar.images, ...images]});
				}
			};
		}
	};


	return (
		<>
			<input ref={input} style={{display: "none"}} accept="image/png,image/jpeg" id="uploadImage" type="file" onChange={onImage} multiple/>
			<label htmlFor="uploadImage" onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>
				{isOverlayVisible ? <DropOverlay>Drop here to add image</DropOverlay> : <AddImage>+</AddImage>}
			</label>
		</>
	);
};

const Images = () => {
	const {state, setSaved} = useContext(CardContext);
	const [fullImageUrl, setFullImageUrl] = useState(null);
	const [isShown, setIsShown] = useState(false);


	const setIsUploading = bool => {
		setIsShown(bool);
		setSaved(!bool);
	};


	return (
		<Container>
			{fullImageUrl && <Overlay src={fullImageUrl} close={() => setFullImageUrl(null)}/>}

			<SubTitle>Attached images</SubTitle>

			<BlockContainer>
				{state.images.map(imageUrl => <Image openFull={e => setFullImageUrl(e.target.getAttribute("src"))} key={imageUrl} url={imageUrl}/>)}

				{state.images.length < schema.images.maxLength && <ImageInput setIsUploading={setIsUploading}/>}
			</BlockContainer>

			<PopUp isShown={isShown}>Uploading image... It might take a few seconds.</PopUp>
		</Container>
	);
};

export default Images;