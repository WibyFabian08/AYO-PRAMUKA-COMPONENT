<script setup>
defineOptions({
  name: 'TimeLines'
})

const props = defineProps({
	items: { type: Array, default: () => [] },
	title: {
		type: String,
		default: null
	},
	caption: {
		type: String,
		default: null
	},
	time: {
		type: String,
		default: null
	}
})
</script>

<template>
	<div class="flex flex-col">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="relative flex flex-col items-start h-auto"
			:class="index === items.length - 1 ? 'min-h-12' : 'min-h-16'"
		>
			<div class="flex gap-[10px]">
				<!-- Time box -->
				<div class="justify-end min-w-20">
					<p class="text-s text-netral-80" v-if="time">{{ item[time] }}</p>
				</div>
				<div>
					<!-- Dot element -->
					<div v-if="index === 0" class="flex justify-center items-center w-[20px] h-[20px] rounded-full border-[2px] border-primary z-10">
						<div class="w-[16px] h-[16px] rounded-full border-[3px] bg-primary z-10 border-netral-10"></div>
					</div>
					<div v-else class="w-[20px] h-[20px] rounded-full bg-primary z-10"></div>

					<!-- Line element (not rendered for last item) -->
					<div v-if="index !== items.length - 1" class="absolute w-[2px] bg-primary h-full ml-[9px]"></div>
				</div>
				<!-- Content box -->
				<div class="flex flex-col">
					<p class="font-medium text-s text-netral-100" v-if="title">{{ item[title] }}</p>
					<p class="font-normal text-s text-netral-90" v-if="caption">{{ item[caption] }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
