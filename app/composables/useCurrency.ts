export const useCurrency = (amount: Ref<number> | number) => {
	const currency = computed(() => {
		const d = new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'EUR'
		}).format(isRef(amount) ? amount.value : amount)

		return d
	})

	return {
		currency
	}
}