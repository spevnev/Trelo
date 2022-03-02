import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";

let msPath = null;
window.addEventListener("mousemove", e => msPath = e.path);

const keys = {};
window.addEventListener("keyup", e => {
	const objects = keys[e.key.toLowerCase()];
	if (!objects || objects.length === 0) return;

	const obj = objects.filter(cur => e.path.indexOf(cur.ref.current) !== -1 || msPath.indexOf(cur.ref.current) !== -1);
	obj.forEach(cur => msPath.indexOf(cur.ref.current) !== -1 && cur.priority--);
	if (obj.length === 0) return;

	obj.sort((a, b) => b.priority - a.priority)[0].cb();
});

const useKeyboard = (...objs) => {
	const [id] = useState(uuid());

	useEffect(() => () => objs.forEach(obj => keys[obj.key] = keys[obj.key].filter(cur => cur.id !== id)));

	useEffect(() => {
		objs.forEach(obj => {
			if (!keys[obj.key]) keys[obj.key] = [];
			keys[obj.key].push({priority: 0, id, ...obj});
		});
	}, [objs]);
};

export default useKeyboard;