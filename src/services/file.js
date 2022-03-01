export const downloadFile = axios => async (url, filename = "Image.png") => {
	const res = await axios.get(url, {responseType: "blob"}).catch(e => console.log(e));
	if (!res || res.status !== 200) return null;

	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(new Blob([res.data]));
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	link.remove();
};

export const uploadFiles = axios => async (boardId, files) => {
	const res = await axios.post(`/file/upload/`, {boardId, files}).catch(e => console.log(e));
	return res && res.status === 200 ? res.data : null;
};