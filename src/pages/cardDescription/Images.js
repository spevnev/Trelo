import React, {useContext, useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import {useDispatch} from "react-redux";
import {addImages} from "../../redux/actionCreators/cardActionCreator";
import bundle from "../../services";
import useKeyboard from "../../hooks/useKeyboard";
import PopUp from "../../components/PopUp";
import {CardContext} from "./index";

const Block = styled.div`
  min-width: 20rem;
  height: 10rem;
  margin-right: 2rem;
  cursor: pointer;
  margin-bottom: 5px;
  transition: all .3s;

  &:hover {
    filter: brightness(90%);
  }
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

const DropOverlay = styled(AddImage)`
  font-size: 1.8rem;
  border: 2px dashed #000;
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin: 2px;
  opacity: 0;
  transition: all .3s;
`;

const ImageContainer = styled(Block)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: url("${props => props.src}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all .3s ease-in;

  &:hover ${Icon} {
    opacity: 1;
  }
`;


const Overlay = ({src, close}) => {
	const body = useRef(document.body);
	const ref = useRef(null);
	useKeyboard({ref: body, key: "escape", cb: close, priority: 1});


	return (
		<OverlayContainer onClick={e => e.target !== ref.current && close()}>
			<Close src={cross} onClick={close}/>
			<OverlayImage ref={ref} src={src}/>
		</OverlayContainer>
	);
};

const Image = ({openFull, delImg, url}) => {
	const deleteImage = e => {
		e.stopPropagation();
		delImg(url);
	};

	const downloadImageLocal = e => {
		e.stopPropagation();
		bundle.file.downloadFile(url);
	};


	return (
		<ImageContainer onClick={openFull} src={url}>
			<Icon src={download} onClick={downloadImageLocal}/>
			<Icon src={cross} onClick={deleteImage}/>
		</ImageContainer>
	);
};

const ImageInput = ({addImages, setUploading}) => {
	const {overlay} = useContext(CardContext);
	const input = useRef(null);


	const preventDefault = e => e.preventDefault();

	const onDrop = e => {
		input.current.files = e.dataTransfer.files;
		onImage({target: input.current});
		e.preventDefault();
	};

	const onImage = e => {
		const files = e.target.files;

		const arr = [];
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.readAsDataURL(files[i]);
			setUploading(true);
			reader.onload = () => {
				arr.push(reader.result);
				if (arr.length === files.length) addImages(arr);
			};
		}
	};


	return (
		<>
			<input ref={input} style={{display: "none"}} accept="image/png,image/jpeg" id="uploadImage" type="file" onChange={onImage} multiple/>
			<label htmlFor="uploadImage" onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>
				{overlay ? <DropOverlay>Drop here to add image</DropOverlay> : <AddImage>+</AddImage>}
			</label>
		</>
	);
};

const Images = () => {
	const {board, state, setState, setSaved} = useContext(CardContext);
	const [fullImg, setFullImg] = useState(null);
	const [isShown, setShown] = useState(false);
	const dispatch = useDispatch();


	const setUploading = bool => {
		setShown(bool);
		setSaved(!bool);
	};

	const openFull = e => setFullImg(e.target.getAttribute("src"));

	const delImage = url => setState({images: state.images.filter(cur => cur !== url)});

	const addImagesLocal = data => state.images.length < 10 && dispatch(addImages(board.id, state.id, data, setUploading));


	return (
		<Container>
			{fullImg && <Overlay src={fullImg} close={() => setFullImg(null)}/>}

			<SubTitle>Attached images</SubTitle>

			<BlockContainer>
				{state.images.map(cur => <Image openFull={openFull} delImg={delImage} key={cur} url={cur}/>)}

				{state.images.length < 10 && <ImageInput setUploading={setUploading} addImages={addImagesLocal}/>}
			</BlockContainer>

			<PopUp isShown={isShown}>Uploading image... It might take a few seconds.</PopUp>
		</Container>
	);
};

export default Images;