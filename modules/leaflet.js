export default new Promise((res) => {
		const script = document.createElement('script');
		script.onload = () => res();
		script.setAttribute('src', 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.js');
		script.setAttribute('integrity', 'sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==');
		script.setAttribute('crossorigin', '');
		document.head.appendChild(script);
	});
