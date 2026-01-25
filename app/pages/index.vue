<script setup lang="ts">
	import { transactionViewOptions } from '@@/constants';

	const { transactions, isLoading, refresh: refreshTransactions } = useTransactions()
	const { groupedTransactionsByDate } = useGroupedTransactionsByDate(transactions)
	const { incomeCount, incomeTotal, expenseCount, expenseTotal } = useCountedTransactions(transactions)

	const selectedView = ref(transactionViewOptions[1])
	const isOpen = ref<boolean>(false)

	const showModal = () => {
		isOpen.value = true;
	}
</script>

<template>
	<section class="flex items-center justify-between mb-10">
		<h1 class="text-4xl font-extrabold">
			Summary
		</h1>
		<div>
			<USelectMenu v-model="selectedView"
						 :items="transactionViewOptions" />
		</div>
	</section>
	<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
		<Trend color="green"
			   title="Income"
			   :amount="incomeTotal"
			   :last-amount="4100"
			   :loading="isLoading" />
		<Trend color="red"
			   title="Expense"
			   :amount="expenseTotal"
			   :last-amount="3800"
			   :loading="isLoading" />
		<Trend color="green"
			   title="Investments"
			   :amount="4000"
			   :last-amount="3000"
			   :loading="isLoading" />
		<Trend color="red"
			   title="Saving"
			   :amount="4000"
			   :last-amount="4100"
			   :loading="isLoading" />
	</section>
	<section class="flex justify-between mb-10">
		<div>
			<h2 class="text-2xl font-extrabold">Transactions</h2>
			<div class="text-gray-500 dark:text-gray-400">
				You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
			</div>
		</div>
		<div>
			<TransactionModal v-model="isOpen"
							  @saved="refreshTransactions()" />
			<UButton icon="i-heroicons-plus-circle"
					 color="neutral"
					 variant="solid"
					 label="Add"
					 @click="showModal" />
		</div>
	</section>
	<section v-if="!isLoading">
		<div v-for="(transactionsOnDay, date) in groupedTransactionsByDate"
			 :key="date"
			 class="mb-10">
			<DailyTransactionSummary :date="date"
									 :transactions="transactionsOnDay" />
			<Transaction v-for="transaction in transactionsOnDay"
						 :key="transaction.id"
						 :transaction="transaction"
						 @deleted="refreshTransactions" />
		</div>
	</section>
	<section v-else>
		<USkeleton class="h-8 w-full mb-2"
				   v-for="i in 4"
				   :key="i" />
	</section>
</template>