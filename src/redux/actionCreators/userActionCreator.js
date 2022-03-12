import actions from "../actions/userActions";

export const setUser = user => ({type: actions.setUser, payload: {user}});