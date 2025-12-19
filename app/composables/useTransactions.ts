import type { ITransaction } from '~/interfaces/ITransaction'

export const useTransactions = () => {
	const supabase = useSupabaseClient()

	const { data, pending, error, refresh } = useDataLoader<ITransaction[]>('transactions', async () => {
		const { data, error } = await supabase
			.from('transactions')
			.select()

		if (error) throw error
		
		return data as ITransaction[]
	})

	return {
		transactions: data,
		isLoading: pending,
		error,
		refresh
	}
}