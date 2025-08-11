<template>
	<div class="min-w-max">
		<section class="flex justify-between px-10 py-3 text-gray-700 bg-white font-montserrat">
			<ul class="flex items-center">
				<li class="pr-6" v-if="hasPrev()">
					<a href="#" @click.prevent="changePage(prevPage)">
						<button class="px-4 py-[13px] flex items-center gap-2 duration-200 hover:bg-primary hover:text-white border rounded-lg border-netral-40">
							<svg
								class="w-4 h-4 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
							</svg>
							Back
						</button>
					</a>
				</li>
				<li class="pr-6" v-if="hasFirst()">
					<a href="#" @click.prevent="changePage(1)">
						<div class="flex items-center justify-center w-6 h-6 transform rotate-45 rounded-md hover:bg-gray-200">
							<span class="transform -rotate-45"> 1 </span>
						</div>
					</a>
				</li>
				<li class="pr-6" v-if="hasFirst()">...</li>
				<li class="pr-6" v-for="page in pages">
					<a href="#" @click.prevent="changePage(page)">
						<div
							:class="{ 'bg-primary text-white': current == page }"
							class="px-4 py-[13px] duration-200 hover:bg-primary hover:text-white border rounded-lg border-netral-40"
						>
							<span class="transform -rotate-45">{{ page }}</span>
						</div>
					</a>
				</li>
				<li class="pr-6" v-if="hasLast()">...</li>
				<li class="pr-6" v-if="hasLast()">
					<a href="#" @click.prevent="changePage(totalPages)">
						<div class="flex items-center justify-center w-6 h-6 transform rotate-45 rounded-md hover:bg-gray-200">
							<span class="transform -rotate-45">
								{{ totalPages }}
							</span>
						</div>
					</a>
				</li>
				<li class="pr-6" v-if="hasNext()">
					<a href="#" @click.prevent="changePage(nextPage)">
						<button class="px-4 py-[13px] flex items-center gap-2 duration-200 hover:bg-primary hover:text-white border rounded-lg border-netral-40">
							Next
							<svg
								class="w-4 h-4 text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
							</svg>
						</button>
					</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Pagination',
	props: {
		current: {
			type: Number,
			default: 1
		},
		total: {
			type: Number,
			default: 0
		},
		perPage: {
			type: Number,
			default: 9
		},
		pageRange: {
			type: Number,
			default: 2
		},
		textBeforeInput: {
			type: String,
			default: 'Go to page'
		},
		textAfterInput: {
			type: String,
			default: 'Go'
		}
	},
	data() {
		return {
			input: ''
		}
	},
	methods: {
		hasFirst: function () {
			return this.rangeStart !== 1
		},
		hasLast: function () {
			return this.rangeEnd < this.totalPages
		},
		hasPrev: function () {
			return this.current > 1
		},
		hasNext: function () {
			return this.current < this.totalPages
		},
		changePage: function (page) {
			if (page > 0 && page <= this.totalPages) {
				this.$emit('page-changed', page)
			}
		}
	},
	computed: {
		pages: function () {
			var pages = []

			for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
				pages.push(i)
			}

			return pages
		},
		rangeStart: function () {
			var start = this.current - this.pageRange

			return start > 0 ? start : 1
		},
		rangeEnd: function () {
			var end = this.current + this.pageRange

			return end < this.totalPages ? end : this.totalPages
		},
		totalPages: function () {
			return Math.ceil(this.total / this.perPage)
		},
		nextPage: function () {
			return this.current + 1
		},
		prevPage: function () {
			return this.current - 1
		}
	}
})
</script>

<style scoped></style>
