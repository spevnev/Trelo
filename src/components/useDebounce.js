import React, {useState} from "react";

const ms = 500;

let timeout = null;
const UseDebounce = (debounce, initialState) => {
	const [state, setState] = useState(initialState);
	const [isSaved, setSaved] = useState(true);


	const startTimer = state => {
		if (timeout !== null) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setSaved(true);
		}, ms);
	};

	const clearTimer = () => clearTimeout(timeout);

	const changeState = (changes, timer = true) => {
		const newState = {...state, ...changes};

		if (timer) startTimer(newState);

		setState(newState);
		setSaved(false);
	};


	return [state, changeState, isSaved, clearTimer];
};

export default UseDebounce;