import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import cross from "../../assets/svg/cross.svg";
import download from "../../assets/svg/download.svg";
import {Container, SubTitle} from "./styles";
import {useDispatch} from "react-redux";
import {addImage} from "../../redux/actionCreators/cardActionCreator";
import bundle from "../../services";
import imagePlaceholder from "../../assets/imgs/imagePlaceholder.png";

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


const Overlay = ({src, close}) => (
	<OverlayContainer>
		<Close src={cross} onClick={close}/>
		<OverlayImage src={src}/>
	</OverlayContainer>
);

const Image = ({boardId, openFull, delImg, id}) => {
	const [src, setSrc] = useState(imagePlaceholder);


	useEffect(() => {
		if (id) bundle.file.getImage(boardId, id).then(data => setSrc(data));
	}, []);


	const deleteImage = e => {
		e.stopPropagation();
		delImg(id);
	};

	const downloadImageLocal = e => {
		e.stopPropagation();
		bundle.file.downloadImage(boardId, id);
	};


	return (
		<ImageContainer onClick={openFull} src={src}>
			<Icon src={download} onClick={downloadImageLocal}/>
			<Icon src={cross} onClick={deleteImage}/>
		</ImageContainer>
	);
};

const ImageInput = ({addImage}) => {
	const input = useRef(null);


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
			reader.onload = () => addImage(reader.result);
		}
	};


	return (
		<>
			<input ref={input} style={{display: "none"}} accept="image/png,image/jpeg" id="uploadImage" type="file" onChange={onImage}/>
			<label htmlFor="uploadImage"><AddImage onDragOver={preventDefault} onDragEnter={preventDefault} onDrop={onDrop}>+</AddImage></label>
		</>
	);
};

const Images = ({boardId, state, commitChanges}) => {
	const [fullImg, setFullImg] = useState(null);
	const dispatch = useDispatch();


	const openFull = e => setFullImg(e.target.getAttribute("src"));

	const delImage = id => commitChanges({images: state.images.filter(cur => cur.id !== id)});

	const addImageLocal = data => state.images.length < 10 && dispatch(addImage(boardId, state, data));


	return (
		<Container>
			{fullImg && <Overlay src={fullImg} close={() => setFullImg(null)}/>}

			<SubTitle>Attached images</SubTitle>

			<BlockContainer>
				{state.images.map(cur => <Image openFull={openFull} boardId={boardId} delImg={delImage} key={cur} id={cur}/>)}

				{state.images.length < 10 && <ImageInput addImage={addImageLocal}/>}
			</BlockContainer>
		</Container>
	);
};

export default Images;