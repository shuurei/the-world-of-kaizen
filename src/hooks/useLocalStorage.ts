export default function useLocalStorage(key: string) {
	const getItem = () => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				return JSON.parse(item);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const setItem = (value: any) => {
		try {
			return window.localStorage.setItem(key, JSON.stringify(value(getItem())));
		} catch (err) {
			console.error(err);
		}
	};

	const clear = () => {
		try {
			return window.localStorage.removeItem(key)
		} catch (err) {
			console.error(err);
		}
	};

	return {
		setItem,
		getItem,
		clear
	}
};