import actions from "../actions/userActions";

export const setUser = user => ({type: actions.setUser, payload: {user}});

export const changeBoards = newBoards => ({type: actions.changeBoards, payload: {newBoards}});
