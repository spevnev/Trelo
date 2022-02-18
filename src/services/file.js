export const uploadFiles = axios => async (boardId, files) => {
	const res = await axios.post(`/file/files/`, {boardId, files}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};

export const uploadImages = axios => async (boardId, images) => {
	const res = await axios.post(`/file/images/`, {boardId, images}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};


export const getFile = axios => async (boardId, id) => {
	const res = await axios.get(`/file/files/${boardId}/${id}/`, {responseType: "blob"}).catch(e => console.log(e));
	return res && res.status === 200 ? window.URL.createObjectURL(new Blob([res.data])) : null;
};

export const getImage = axios => async (boardId, id) => {
	const res = await axios.get(`/file/images/${boardId}/${id}`, {responseType: "blob"}).catch(e => console.log(e));
	return res && res.status === 200 ? window.URL.createObjectURL(new Blob([res.data])) : null;
};


const download = (filename, data) => {
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	link.remove();
};

export const downloadFile = axios => async (boardId, id, filename) => {
	const res = await (getFile(axios)(boardId, id));
	if (res === null) return null;

	download(filename, res);
	return true;
};

export const downloadImage = axios => async (boardId, id) => {
	const res = await (getImage(axios)(boardId, id));
	if (res === null) return null;

	download("Image.png", res);
	return true;
};