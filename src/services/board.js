export const getBoard = axios => async (id) => {
	const res = await axios.get(`http://localhost:3000/api/board/${id}`).catch(e => console.log("Error", e));

	if (res.status === 200) return res.data;
	return null;
};