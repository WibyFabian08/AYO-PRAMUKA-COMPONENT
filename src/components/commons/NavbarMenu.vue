<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
	initFlowbite()
})
</script>

<template>
  <nav class="fixed top-0 z-30 w-full border-b bg-netral-10 dark:bg-netral-100 dark:border-b-[0.1px] dark:border-b-netral-10" id="nav">
		<div class="p-3 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between gap-7">
        <div class="flex items-center gap-3 justify-start text-netral-100 text-heading-s font-bold">
          <div class="hidden w-[16.25rem] md:block lg:block"></div>
          <p>Beranda</p>
          <button
						data-drawer-target="logo-sidebar"
						data-drawer-toggle="logo-sidebar"
						aria-controls="logo-sidebar"
						type="button"
						class="inline-flex items-center p-2 text-s text-netral-90 md:hidden dark:text-netral-10 dark:hover:bg-netral-90 "
					>
						<span class="sr-only">Open sidebar</span>
						<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								clip-rule="evenodd"
								fill-rule="evenodd"
								d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
							></path>
						</svg>
					</button>
        </div>
        <div class="flex items-center gap-7 justify-end">
          <i class="ti ti-bell text-[18px]"></i>
          <i class="ti ti-message text-[18px]"></i>
          <div class="flex flex-col text-right border-l-2 border-netral-30 pl-7 lg:block md:block">
            <p class="text-body-large text-netral-100">Eko Agus Moh. Iqbal</p>
            <p class="text-body text-netral-70">Pembina</p>
          </div>
          <i class="ti ti-chevron-down"></i>
        </div>
      </div>
    </div>
  </nav>
</template>