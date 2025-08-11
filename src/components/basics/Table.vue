<script setup>
defineOptions({
  name: 'Table'
})

import CheckboxText from './CheckboxText.vue'
import { ref, computed } from 'vue'
import Pagination from './Pagination.vue'
import moment from 'moment'
import Select from './Select.vue'
const props = defineProps({
	tableHead: Array,
	tableRows: Object,
	title: String,
	isFilter: {
		type: Boolean,
		default: false
	},
	isPagination: {
		type: Boolean,
		default: true
	},
	isCheckbox: {
		type: Boolean,
		default: false
	},
	PaginationConfig: {
		type: Object,
		default: {
			current: 1,
			perPage: 1,
			pageRange: 1,
			total: 10
		}
	}
})

const emit = defineEmits(['pageChange'])
const sortRows = ref([...props.tableRows])
const isAsc = ref(false)
const isNumber = ref(false)
const isDate = ref(false)
const isTime = ref(false)

const handleCheckBox = (value) => {
	console.log(value)
}

const handlePageChange = (value) => {
	console.log(value)
	emit('pageChange', value)
}

const sortData = (sortBy, direction) => {
	switch (sortBy) {
		case 'number':
			isNumber.value = !isNumber.value
			if (isNumber.value === true) {
				sortRows.value = sortRows.value.sort((a, b) => {
					return parseFloat(a.price) - parseFloat(b.price)
				})
			} else {
				sortRows.value = sortRows.value.sort((a, b) => {
					return parseFloat(b.price) - parseFloat(a.price)
				})
			}
			break
		case 'time':
			isTime.value = !isTime.value
			if (isTime.value === true) {
				sortRows.value = sortRows.value.sort((a, b) => {
					return moment(a).diff(b)
				})
			} else {
				sortRows.value = sortRows.value.sort((a, b) => {
					return moment(b).diff(a)
				})
			}
			break
		default:
			if (direction === 'ASC' && isAsc.value === false) {
				isAsc.value = true
				sortRows.value = sortRows.value.sort((a, b) => {
					return a.name.localeCompare(b.name)
				})
			} else if (direction === 'ASC' && isAsc.value === true) {
				isAsc.value = false
				sortRows.value = sortRows.value.sort((a, b) => {
					return b.name.localeCompare(a.name)
				})
			}

			break
	}
}

const showDataOptions = [
	{
		name: 10
	},
	{
		name: 25
	},
	{
		name: 50
	},
	{
		name: 100
	},
	{
		name: 200
	}
]
</script>

<template>
	<section class="max-w-screen-2xl dark:bg-gray-900">
		<div class="relative overflow-x-auto">
			<table class="w-full text-left text-gray-500 rtl:text-right dark:text-gray-400">
				<thead class="text-xs uppercase text-netral-100 bg-netral-20 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th v-if="isCheckbox" class="px-4 py-[17px] text-m font-semibold">
							<CheckboxText @handle-check="handleCheckBox" data="ssss" />
						</th>
						<th v-for="(item, index) in tableHead" :key="index" scope="col" class="px-4 py-[17px] text-m font-semibold">
							<div class="flex items-center gap-2">
								<h1>{{ item.name }} &nbsp;</h1>
								<svg
									@click="sortData(item.type, 'ASC')"
									class="w-4 h-4 text-gray-800 cursor-pointer dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fill-rule="evenodd"
										d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, idx) in sortRows" :key="idx">
						<td v-if="isCheckbox"><CheckboxText @handle-check="handleCheckBox" :data="row" /></td>
						<td v-for="col in Object.values(row)">{{ col }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex items-center justify-between">
			<Pagination
				:current="PaginationConfig.current"
				:per-page="PaginationConfig.perPage"
				:page-range="PaginationConfig.pageRange"
				:total="PaginationConfig.total"
				@page-changed="handlePageChange"
			/>

			<div class="flex items-center gap-3">
				<p class="text-netral-100">Halaman</p>
				<Select :options-props="showDataOptions" />
			</div>
		</div>
	</section>
</template>

<style>
tbody td {
	padding: 17px 16px 17px 16px;
	font-size: 14px;
}
</style>
