<script lang="ts" setup>
	import { z } from 'zod';
	import { categories, types } from '~~/constants';

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
		amount: undefined,
		created_at: undefined,
		description: undefined,
		category: undefined,
	}

	const state = reactive<Partial<Schema>>({
		...defaultState,
	})
	
	const save = () => {}

	const resetForm = () => {
		Object.assign(state, defaultState)
	}
</script>

<template>
	<UModal title="Add transaction"
			:close="{ onClick: () => resetForm() }">
		<UButton icon="i-heroicons-plus-circle"
				 color="neutral"
				 variant="solid"
				 label="Add" />
		<template #body>
			<UForm :state="state"
				   :schema="schema"
				   @submit.prevent="save">
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
			</UForm>
		</template>
		<template #footer>
			<UButton type="submit"
					 color="neutral"
					 variant="solid"
					 label="Save" />
		</template>
	</UModal>
</template>