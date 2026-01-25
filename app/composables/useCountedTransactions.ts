import type { ITransaction } from '~/interfaces/ITransaction';

export const useCountedTransactions = (transactions: Ref<ITransaction[]>) => {
	const income = computed(() => transactions.value.filter(t => t.type === 'Income'));
	const expense = computed(() => transactions.value.filter(t => t.type === 'Expense'));
	const incomeCount = computed(() => income.value.length);
	const expenseCount = computed(() => expense.value.length)
	const incomeTotal = computed(() => {
		return income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
	});
	const expenseTotal = computed(() => expense.value.reduce((sum, transaction) => sum + transaction.amount, 0));

	return {
		income,
		expense,
		incomeCount,
		expenseCount,
		incomeTotal,
		expenseTotal,
	}
}