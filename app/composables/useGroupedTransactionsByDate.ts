import type { ITransaction } from '~/interfaces/ITransaction';

export const useGroupedTransactionsByDate = (transactions: Ref<ITransaction[]>) => {
	const groupedTransactionsByDate = computed(() => {
		if (!transactions.value) {
			return;
		}

		let grouped: Record<string, ITransaction[]> = {}

		for (const transaction of transactions.value) {
			const date = new Date(transaction.created_at).toISOString().split('T')[0] as string;

			if (!grouped[date]) {
				grouped[date] = []
			}

			grouped[date].push(transaction)
		}

		return grouped
	})

	return {
		groupedTransactionsByDate
	}
}
