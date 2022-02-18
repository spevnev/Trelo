import React, {useEffect} from "react";

const useKeyboard = arr => {
	useEffect(() => {
		const listener = e => arr.forEach(cur => e.path.indexOf(cur.ref.current) !== -1 && e.key.toLowerCase() === cur.key.toLowerCase() && cur.cb());
		window.addEventListener("keyup", listener);
		return () => window.removeEventListener("keyup", listener);
	});
};

export default useKeyboard;