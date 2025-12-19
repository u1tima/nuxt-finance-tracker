export const useDataLoader = <T>(key: string, loader: () => Promise<T>) => {
	const { data, pending, error, refresh } = useAsyncData(key, loader)

	return {
		data,
		pending,
		error,
		refresh,
	}
}