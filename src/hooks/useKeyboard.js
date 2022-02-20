import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";

const keys = {};

window.addEventListener("keyup", e => {
	const obj = keys[e.key.toLowerCase()];
	if (obj) obj.filter(cur => e.path.indexOf(cur.ref.current) !== -1).sort((a, b) => b.priority - a.priority)[0].cb();
});

const useKeyboard = obj => {
	const [id] = useState(uuid());

	useEffect(() => () => keys[obj.key] = keys[obj.key].filter(cur => cur.id !== id));

	useEffect(() => {
		if (!keys[obj.key]) keys[obj.key] = [];
		keys[obj.key] = keys[obj.key].filter(cur => cur.ref.current && cur.id !== id);
		keys[obj.key].push({priority: 0, id, ...obj});
	}, [obj]);
};

export default useKeyboard;