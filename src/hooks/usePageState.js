import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

const saveMs = 500;
const forceLoadingMs = 200;

let timeout = null;
const usePageState = (initState, isError, errorMsg, isLoading, deps, debounce) => {
	const [state, setState] = useState(null);
	const [isSaved, setSaved] = useState(true);
	const [loading, setLoading] = useState(true);

	// Init & on change through reducer
	useEffect(() => {
		setState(initState());
		setTimeout(() => setLoading(false), forceLoadingMs);
	}, []);

	useEffect(() => {
		setState(deps);
	}, !deps ? [{}] : deps[Symbol.iterator] ? deps : [deps]);


	// Debounce
	const startTimer = state => {
		if (timeout !== null) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setSaved(true);
		}, saveMs);
	};

	const clearTimer = () => clearTimeout(timeout);

	const changeState = (changes, timer = true) => {
		const newState = {...state, ...changes};

		if (timer) startTimer(newState);

		setState(newState);
		setSaved(false);
	};


	// Page state
	let pageState = null;
	if (loading || isLoading(state)) pageState = <PageLoading/>;
	else if (isError(state)) pageState = <PageError>{errorMsg}</PageError>;

	return [pageState, state, changeState, isSaved, clearTimer];
};

export default usePageState;