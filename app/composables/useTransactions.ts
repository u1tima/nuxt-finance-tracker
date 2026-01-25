import type { ITransaction } from '~/interfaces/ITransaction'

export const useTransactions = () => {
	const supabase = useSupabaseClient()

	const { data, pending, error, refresh } = useDataLoader<ITransaction[]>('transactions', async () => {
		const { data, error } = await supabase
			.from('transactions')
			.select()
			.order('created_at', { ascending: false })

		if (error) throw error

		return data
	})

	return {
		transactions: data as Ref<ITransaction[]>,
		isLoading: pending,
		error,
		refresh
	}
}