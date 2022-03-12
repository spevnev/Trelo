import React, {useEffect, useState} from "react";
import PageLoading from "../components/PageLoading";
import config from "../config";

let timeout = null;
let currentState = null; // to handle edge case - on exit the state variable goes to default value (null)
const usePageState = (initState, onLoad, isError, errorElement, isLoading, deps = "", debounce) => {
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
		currentState = deps;
		setState(deps);
	}, [deps]);

	useEffect(() => () => saveChanges(), []);


	window.onbeforeunload = () => {
		if (!shouldSave()) return;

		saveChanges();
		return "";
	};

	const shouldSave = () => !(isSaved && isForceSaved);

	const saveChanges = () => debounce(currentState);

	const startTimer = state => {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			debounce(state);
			setIsSaved(true);
		}, config.DEBOUNCE_SAVE_MS);
	};

	const clearTimer = () => clearTimeout(timeout);

	const changeState = (changes, timer = true) => {
		const newState = {...state, ...changes};

		if (timer) startTimer(newState);

		currentState = newState;
		setState(newState);
		setIsSaved(false);
	};


	let pageState = null;
	if (isForceLoading) pageState = <PageLoading/>;
	else if (isLoading()) pageState = <PageLoading/>;
	else if (isError()) pageState = errorElement;

	return [pageState, state, changeState, setIsForceSaved, clearTimer];
};

export default usePageState;