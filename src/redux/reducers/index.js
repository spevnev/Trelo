import {combineReducers} from "redux";

import userReducer from "./userReducer";
import boardReducer from "./boardReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({user: userReducer, board: boardReducer, card: cardReducer});

export default rootReducer;