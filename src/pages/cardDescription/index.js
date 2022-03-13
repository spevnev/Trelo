import React, {createContext, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {ChangeCard, DeleteCard} from "../../redux/thunkActionCreators/cardActionCreator";
import bundle from "../../services/api";
import Title from "./Title";
import Assigned from "./Assigned";
import Description from "./Description";
import Images from "./Images";
import Files from "./Files";
import GoBack from "../../components/GoBack";
import Modal from "../../components/Modal";
import {getBoard, getCard} from "../../redux/selectors";
import usePageState from "../../hooks/usePageState";
import {FetchBoard} from "../../redux/thunkActionCreators/boardActionCreator";
import deleteIcon from "../../assets/svg/cross.svg";
import useKeyboard from "../../hooks/useKeyboard";
import useTitle from "../../hooks/useTitle";
import PageError from "../../components/PageError";

const Container = styled.div`
  padding: 0 2vw;
  height: 95vh;
  background: #f8f8f8;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Cross = styled.img`
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: auto 10px;
`;


export const CardContext = createContext(null);

let timeout = null;
let saveOnExit = true;
const CardDescription = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {boardId, cardId} = useParams();

	const card = useSelector(getCard(boardId, cardId));
	const board = useSelector(getBoard(boardId));
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const [modalText, setModalText] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const bodyRef = useRef(document.body);

	useKeyboard({ref: bodyRef, key: "escape", cb: () => goBack()});

	useTitle(card && card.title ? card.title : "Card");

	const initState = () => {
		if (card && board && board.status === "READY") return card;
		if (!board) dispatch(FetchBoard(boardId));
	};
	const onLoad = () => !window.location.href.includes("new") && dispatch(FetchBoard(boardId, false));
	const isError = () => !board || !card || board.status === "ERROR";
	const errorElement = <PageError goBackUrl={!board || board.status === "ERROR" ? "/" : "../"}>This card doesn't exist!</PageError>;
	const isLoading = () => board && board.status === "LOADING";
	const deps = card;
	const debounce = state => {
		if (!saveOnExit) return;

		dispatch(ChangeCard(boardId, state));

		if (card) {
			const filesCopy = [...state.files];
			const fileUrls = card.files.map(file => file.url);

			filesCopy.forEach(file => {
				const idx = fileUrls.indexOf(file.url);
				if (idx === -1) return;

				const prev = card.files[idx];
				if (file.filename !== prev.filename) bundle.cardAPI.renameFile(boardId, file);
			});
		}
	};
	const [pageState, state, setState, setSaved, clearTimer] = usePageState(initState, onLoad, isError, errorElement, isLoading, deps, debounce);

	if (pageState) return pageState;


	const modalEmptyTitleText = "Title can't be empty! Do you want to delete this card?";
	const modalEmptyCardText = "Are you sure you want to delete this card?";

	const isCardEmpty = card => !card.title && !card.description && card.assigned.length === 0 && card.images.length === 0 && card.files.length === 0;

	const openModal = text => {
		setModalText(text);
		setIsOpen(true);
	};

	const goBack = () => {
		if (isCardEmpty(card)) return delCard();
		else if (!card.title) return openModal(modalEmptyTitleText);

		clearTimer();
		navigate(`/board/${boardId}`);
	};

	const delCard = () => {
		dispatch(DeleteCard(boardId, cardId, () => {
			clearTimer();
			saveOnExit = false;
			navigate("../");
		}));
	};

	const onDragEnter = () => {
		setIsOverlayVisible(true);

		// overlay is visible for a second after last mouse move with files being dragged
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => setIsOverlayVisible(false), 1000);
	};


	const contextValues = {state, board, setState, isOverlayVisible, setSaved};

	return (
		<Container onDragEnter={onDragEnter} onDrop={() => setIsOverlayVisible(false)}>
			<SubContainer>
				<GoBack onClick={goBack}/>
				<Cross onClick={() => openModal(modalEmptyCardText)} src={deleteIcon}/>
			</SubContainer>

			<CardContext.Provider value={contextValues}>
				<Title/>
				<Assigned/>
				<Description/>
				<Images/>
				<Files/>
			</CardContext.Provider>

			<Modal onCancel={() => setIsOpen(false)} onContinue={delCard} isOpened={isOpen} text={modalText}/>
		</Container>
	);
};

export default CardDescription;