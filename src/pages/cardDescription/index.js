import React from "react";
import {useNavigate, useParams} from "react-router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {changeCard} from "../../redux/actionCreators/cardActionCreator";
import arrowBack from "../../assets/svg/arrow-left.svg";
import Title from "./Title";
import Assigned from "./Assigned";
import Description from "./Description";
import Images from "./Images";
import Files from "./Files";

const Container = styled.div`
  margin: 0 2vw;
`;

const GoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
  margin: 2vh 0;

  & img {
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
  }
`;

const CardDescription = () => {
	const {boardId, cardId} = useParams();
	const card = useSelector(state => state.card.filter(cur => cur.id === boardId)[0].cards.filter(cur => cur.id === cardId)[0]);
	const users = useSelector(state => state.board.filter(cur => cur.id === boardId)[0].users);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const goBack = () => navigate("../");

	const changeTitle = e => dispatch(changeCard(boardId, cardId, {title: e.target.value}));

	const addAssigned = user => dispatch(changeCard(boardId, cardId, {assigned: [...card.assigned, user[0]]}));

	const changeDescription = e => dispatch(changeCard(boardId, cardId, {description: e.target.value}));

	const addImage = src => dispatch(changeCard(boardId, cardId, {images: [...card.images, src]}));
	const delImage = src => dispatch(changeCard(boardId, cardId, {images: card.images.filter(cur => cur !== src)}));

	const addFile = (filename, data) => dispatch(changeCard(boardId, cardId, {files: [...card.files, {filename, data}]}));
	const delFile = filename => dispatch(changeCard(boardId, cardId, {files: card.files.filter(cur => cur.filename !== filename)}));

	return (
		<Container>
			<GoBack onClick={goBack}>
				<img src={arrowBack} alt=""/>
				Return to the board
			</GoBack>

			<Title title={card.title} onChange={changeTitle}/>
			<Assigned assigned={card.assigned} users={users} addAssigned={addAssigned}/>
			<Description description={card.description} onChange={changeDescription}/>
			<Images images={card.images} addImage={addImage} delImage={delImage}/>
			<Files files={card.files} dispatchAddFile={addFile} delFile={delFile}/>
		</Container>
	);
};

export default CardDescription;