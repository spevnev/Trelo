export const getCards = axios => async (id) => {
	const res = await axios.get(`http://localhost:3000/api/cards/${id}`).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};