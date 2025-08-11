<script setup>
defineOptions({
  name: 'Modal'
})

const props = defineProps({
	isVisible: Boolean,
	showModal: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ""
	},
	isBorder:{
		type: Boolean,
		default:true
	},
	classWidth :{
		type:String,
		default:'max-w-2xl'
	},
	isFooter:{
		type:Boolean,
		default:true
	},
	isHeader:{
		type:Boolean,
		default:true
	},
	bgColor:{
		type:String,
		default:'bg-white'
	}
})

const emit = defineEmits(['update:isVisible'])

const closeModal = () => {
	emit('update:isVisible', false)
}
</script>

<template>
	<transition
		enter-active-class="transition duration-500 ease-out transform"
		enter-from-class="scale-95 opacity-0"
		enter-to-class="scale-100 opacity-100"
		leave-active-class="transition duration-500 ease-in transform"
		leave-from-class="scale-100 opacity-100"
		leave-to-class="scale-95 opacity-0"
	>
		<div
			v-if="isVisible"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
			tabindex="-1"
			aria-hidden="true"
		>
			<div class="absolute inset-0 bg-black opacity-50"></div>
			<div class="relative w-full max-w-2xl max-h-full">
				<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
					<!-- Modal header -->
					<div class="flex items-center justify-between p-[18px] border-b rounded-t bg-netral-20">
						<slot name="header">
							<!-- isi header -->
							<p class="font-bold text-heading-l text-netral-100">Default Header</p>
						</slot>
						<button
							@click="closeModal"
							class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-s p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</button>
					</div>

					<!-- Modal body -->
					<div class="px-[18px] py-5">
						<slot name="body">
							<!-- isi body -->
							<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Default modal body content goes here.</p>
						</slot>
					</div>

					<!-- Modal footer -->
					<div v-if="$slots.footer" class="flex justify-end items-center p-[18px] space-x-2 border-t border-gray-200 rounded-b">
						<slot name="footer">
							<!-- isi footer -->
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style>
.preview-wrapper-enter-from {
	opacity: 0;
}

.preview-wrapper-enter-to {
	opacity: 1;
}

.preview-wrapper-enter-active {
	transition: all 0.5s ease-in-out;
}

.preview-wrapper-leave-from {
	opacity: 1;
}

.preview-wrapper-leave-to {
	opacity: 0;
}

.preview-wrapper-leave-active {
	transition: all 0.5s ease-in-out;
}

.modal-wrapper::-webkit-scrollbar {
	width: 5px;
	display: none;
}
</style>
