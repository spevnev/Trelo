import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import config from "../config";


let timeout = null;
const usePageState = (initState, onLoad, isError, errorMsg, isLoading, deps, debounce) => {
	const [state, setState] = useState(initState());
	const [isSaved, setSaved] = useState(true);
	const [forceSaved, setForceSaved] = useState(true);
	const [forceLoading, setForceLoading] = useState(!state || isError());

	// Init & on change, save changes on exit
	useEffect(() => {
		if (!forceLoading) onLoad();
		setTimeout(() => setForceLoading(false), config.FORCE_LOADING_MS);

		return () => window.onbeforeunload = null;
	}, []);

	useEffect(() => {
		setState(deps);
	}, !deps ? [{}] : [deps]);

	window.onbeforeunload = () => {
		if (!(isSaved && forceSaved)) return "";
	};

	// Debounce
	const startTimer = state => {
		if (timeout !== null) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setSaved(true);
		}, config.DEBOUNCE_SAVE_MS);
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
	if (forceLoading) pageState = <PageLoading/>;
	else if (isError()) pageState = <PageError>{errorMsg}</PageError>;
	else if (isLoading()) pageState = <PageLoading/>;

	return [pageState, state, changeState, isSaved && forceSaved, setForceSaved, clearTimer];
};

export default usePageState;