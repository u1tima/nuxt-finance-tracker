<script lang="ts" setup>
	import { z } from 'zod';
	import { categories, types } from '~~/constants';

	const props = defineProps({
		modelValue: Boolean
	})

	const emit = defineEmits(['update:modelValue', 'saved'])
	
	const isLoading = ref(false)
	const supabase = useSupabaseClient()
	const toast = useToast()

	const defaultSchema = z.object({
		created_at: z.string(),
		description: z.string().optional(),
		amount: z.number().positive('Amount needs to be more than 0')
	})

	const incomeSchema = z.object({
		type: z.literal('Income')
	})
	const expenseSchema = z.object({
		type: z.literal('Expense'),
		category: z.enum(categories)
	})
	const investmentSchema = z.object({
		type: z.literal('Investment')
	})
	const savingSchema = z.object({
		type: z.literal('Saving')
	})

	const schema = z.intersection(
		z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
		defaultSchema
	)

	type Schema = z.output<typeof schema>

	const defaultState = {
		type: undefined,
		amount: 0,
		created_at: '',
		description: '',
		category: '',
	}

	const state = reactive<Partial<Schema>>({
		...defaultState,
	})

	const save = async () => {
		isLoading.value = true

		try {
			const { error } = await supabase
				.from('transactions')
				.upsert(state)

			if (!error) {
				toast.add({
					'title': 'Transaction saved',
					'icon': 'i-heroicons-check-circle'
				});

				emit('saved')
			}

			throw error
		} catch (e) {
			toast.add({
				title: 'Transaction not saved',
				description: e.message,
				icon: 'i-heroicons-exclamation-circle',
				color: 'error'
			})
		} finally {
			isLoading.value = false
			isOpen.value = false
		}
	}

	const resetForm = () => {
		Object.assign(state, defaultState)
	}

	const isOpen = computed({
		get: () => props.modelValue,
		set: (value) => {
			if (!value) resetForm()
			emit('update:modelValue', value)
		}
	});

</script>

<template>
	<UModal v-model:open="isOpen"
			title="Add transaction">
		<template #body>
			<UForm :state="state"
				   :schema="schema"
				   @submit="save">
				<UFormField :required="true"
							label="Transaction Type"
							name="type"
							class="mb-4">
					<USelect v-model="state.type"
							 :items="types"
							 placeholder="Select the transaction type"
							 class="w-full" />
				</UFormField>
				<UFormField required
							label="Amount"
							name="amount"
							class="mb-4">
					<UInput v-model.number="state.amount"
							type="number"
							placeholder="Amount"
							class="w-full" />
				</UFormField>
				<UFormField label="Transaction date"
							:required="true"
							name="created_at"
							class="mb-4">
					<UInput v-model="state.created_at"
							type="date"
							icon="i-heroicons-calendar-days-20-solid"
							class="w-full" />
				</UFormField>
				<UFormField label="Description"
							hint="Optional"
							name="description"
							class="mb-4">
					<UInput v-model="state.description"
							placeholder="Description"
							class="w-full" />
				</UFormField>
				<UFormField v-if="state.type === 'Expense'"
							:required="true"
							label="Category"
							name="category"
							class="mb-4">
					<USelect v-model="state.category"
							 placeholder="Category"
							 :items="categories"
							 class="w-full" />
				</UFormField>
				<UButton type="submit"
						 color="neutral"
						 variant="solid"
						 label="Save" />
			</UForm>
		</template>
	</UModal>
</template>