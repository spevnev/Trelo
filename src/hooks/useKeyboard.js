import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";

let elementsUnderCursor = [];
const keyToObject = {};


window.addEventListener("mousemove", e => elementsUnderCursor = e.path);
window.addEventListener("click", e => {
	// get elements at position of mouse after the call stack empties
	setTimeout(() => elementsUnderCursor = document.elementsFromPoint(e.x, e.y), 0);
});

window.addEventListener("keyup", e => {
	const isObjectInPath = obj => elementsUnderCursor.indexOf(obj.ref.current) !== -1;
	const isObjectInFocus = obj => e.path.indexOf(obj.ref.current) !== -1 || isObjectInPath(obj);

	const objects = keyToObject[e.key.toLowerCase()];
	if (!objects || objects.length === 0) return;

	const focusedObjects = objects.filter(isObjectInFocus);
	if (focusedObjects.length === 0) return;

	// prioritize elements that are focused by keyboard/caret than by mouse/cursor
	focusedObjects.forEach(obj => {
		if (elementsUnderCursor.indexOf(obj.ref.current) !== -1) obj.priority--;
	});

	focusedObjects.sort((a, b) => b.priority - a.priority)[0].cb();
});


const useKeyboard = (...objects) => {
	const [id] = useState(uuid());

	useEffect(() => () => {
		// clearing objects of unused hook
		objects.forEach(obj => keyToObject[obj.key] = keyToObject[obj.key].filter(obj => obj.id !== id));
	});

	useEffect(() => {
		objects.forEach(obj => {
			if (!keyToObject[obj.key]) keyToObject[obj.key] = [];

			// filtering out objects without the element on the page
			keyToObject[obj.key] = keyToObject[obj.key].filter(obj => obj.ref.current);

			keyToObject[obj.key].push({priority: 0, id, ...obj});
		});
	}, [objects]);
};

export default useKeyboard;