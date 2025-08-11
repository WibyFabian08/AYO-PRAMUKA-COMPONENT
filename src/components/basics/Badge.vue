<script setup>
defineOptions({
  name: 'Badge'
})

const props = defineProps({
	badgeType: {
		type: String,
		default: 'primary'
	},
	label: {
		type: String,
		default: ''
	}
})
</script>

<template>
	<span v-if="badgeType === 'primary'" class="bg-[#EFE3FF] text-primary text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-[#D3BBF3]">{{
		label
	}}</span>
	<span
		v-if="badgeType === 'success'"
		class="bg-[#E9F1ED] text-[#20573D] text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-[#B8DBCA]"
		>{{ label }}</span
	>
	<span
		v-if="badgeType === 'warning'"
		class="bg-[#FFF9F2] text-[#734011] text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-[#EECEB0]"
		>{{ label }}</span
	>
	<span v-if="badgeType === 'error'" class="bg-[#FFF4F2] text-[#CB3A31] text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-[#EEB4B0]">{{
		label
	}}</span>
	<span v-if="badgeType === 'info'" class="bg-[#F0F3FF] text-[#3267E3] text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-[#B1C5F6]">{{
		label
	}}</span>
	<span
		v-if="badgeType === 'disable'"
		class="bg-netral-30 text-netral-80 text-s font-medium me-2 px-2.5 py-0.5 rounded-md border border-netral-50"
		>{{ label }}</span
	>

	<span v-if="badgeType === null"></span>
</template>
