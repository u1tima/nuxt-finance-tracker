<script lang="ts" setup>
	import { categories, types } from '~~/constants';

	const state = ref({
		type: "Income",
		amount: 110,
		created_at: undefined,
		description: undefined,
		category: undefined
	})
</script>

<template>
	<UModal title="Add transaction">
		<UButton icon="i-heroicons-plus-circle"
				 color="neutral"
				 variant="solid"
				 label="Add" />
		<template #body>
			<UForm>
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
				<UFormField :required="true"
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