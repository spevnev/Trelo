import actions from "../actions/boardActions";

export const setStatus = (id, status) => ({type: actions.setStatus, payload: {id, status}});
export const changeBoard = (id, board) => ({type: actions.changeBoard, payload: {id, board}});

export const deleteBoard = id => ({type: actions.deleteBoard, payload: {id}});
export const addBoard = board => ({type: actions.addBoard, payload: {board}});
