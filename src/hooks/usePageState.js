import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import config from "../config";

let timeout = null;
let externalState = null;
const usePageState = (initState, onLoad, isError, errorMsg, isLoading, deps, debounce) => {
	const [state, setState] = useState(initState());
	const [isSaved, setIsSaved] = useState(true);
	const [isForceSaved, setIsForceSaved] = useState(true);
	const [isForceLoading, setIsForceLoading] = useState(!state || isError());

	useEffect(() => {
		if (!isForceLoading) onLoad(); // if page was already visited

		setTimeout(() => setIsForceLoading(false), config.FORCE_LOADING_MS);

		return () => window.onbeforeunload = null;
	}, []);

	useEffect(() => {
		externalState = deps;
		setState(deps);
	}, !deps ? [{}] : [deps]);

	useEffect(() => () => saveChanges(), []);


	window.onbeforeunload = () => {
		if (!(isSaved && isForceSaved)) {
			saveChanges();
			return "";
		}
	};


	const saveChanges = () => debounce(externalState);

	const startTimer = state => {
		if (timeout !== null) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setIsSaved(true);
		}, config.DEBOUNCE_SAVE_MS);
	};

	const clearTimer = () => clearTimeout(timeout);

	const changeState = (changes, timer = true) => {
		const newState = {...state, ...changes};

		if (timer) startTimer(newState);

		externalState = newState;
		setState(newState);
		setIsSaved(false);
	};


	let pageState = null;
	if (isForceLoading) pageState = <PageLoading/>;
	else if (isError()) pageState = <PageError>{errorMsg}</PageError>;
	else if (isLoading()) pageState = <PageLoading/>;

	return [pageState, state, changeState, isSaved && isForceSaved, setIsForceSaved, clearTimer, saveChanges];
};

export default usePageState;