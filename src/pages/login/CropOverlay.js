import React, {useEffect, useRef, useState} from "react";
import Cropper from "react-easy-crop";
import Button from "../../components/Button";
import styled from "styled-components";
import useKeyboard from "../../hooks/useKeyboard";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const UI = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -125%);
  max-width: 30rem;
  width: 75vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  border-radius: 5px;
  border: none;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  padding: 8px 16px;

  & ${Button} {
    font-size: 2rem;
    padding: 6px 12px;
  }
`;

const PrimaryButton = styled(Button)`
  background: #4040ff;
  color: #fff;
  border: none;
`;


const canvas = document.createElement("canvas");
canvas.width = 100;
canvas.height = 100;
canvas.style.display = "none";
document.body.append(canvas);
const context = canvas.getContext("2d");
const imageObj = new Image();

const CropOverlay = ({isShown, setCropping, image, onSubmit}) => {
	const [crop, setCrop] = useState({x: 0, y: 0});
	const [zoom, setZoom] = useState(1);

	const ref = useRef();
	useKeyboard({ref, key: "enter", priority: 1, cb: () => confirm()}, {ref, key: "escape", cb: () => close()});


	useEffect(() => {
		imageObj.src = image;
		onChange(null, {x: 0, y: 0, width: imageObj.width, height: imageObj.height});
	}, [image]);


	const onChange = (percents, {x, y, width, height}) => imageObj.complete && context.drawImage(imageObj, x, y, width, height, 0, 0, 100, 100);

	const close = () => {
		setCropping(false);
		canvas.remove();
	};

	const confirm = () => {
		onSubmit(canvas.toDataURL("image/png"));
		close();
	};


	if (!isShown) return null;
	return (
		<Container ref={ref}>
			<Cropper image={image} onCropComplete={onChange} onCropAreaChange={onChange}
					 crop={crop} zoom={zoom}
					 onCropChange={setCrop} onZoomChange={setZoom}
					 aspect={1} cropShape="round" showGrid={false}/>

			<UI>
				<Button onClick={close}>Cancel</Button>
				<PrimaryButton onClick={confirm}>Confirm</PrimaryButton>
			</UI>
		</Container>
	);
};

export default CropOverlay;