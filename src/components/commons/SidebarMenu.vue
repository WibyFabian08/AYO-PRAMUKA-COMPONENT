<script setup>
import { ref } from 'vue';

const props = defineProps({
	isSide: { type: Boolean, default: false }
})

const menus = ref([
  { id: 'beranda', label: 'Beranda', active:true, icon: 'ti ti-home', path: '/' },
  { id: 'sosial', label: 'Sosial', icon: 'ti ti-world', isOpen: false, subs: [
      { id: 'pertemanan', label: 'Pertemanan', path: '/pertemanan' },
      { id: 'berita', label: 'Berita', path: '/berita' },
      { id: 'kegiatan', label: 'Kegiatan', path: '/kegiatan' },
      { id: 'forum', label: 'Forum', path: '/forum' },
      { id: 'polling', label: 'Polling', path: '/polling' },
    ]
  },
  { id: 'pendidikan', label: 'Pendidikan', icon: 'ti ti-book-2', isOpen: false, subs: [
      { id: 'buku-saku', label: 'Buku Saku', path: '/buku-saku' },
      { id: 'e-learning', label: 'E-Learning', path: '/e-learning' },
      { id: 'panduan', label: 'Panduan', path: '/panduan' }
    ]
  },
  { id: 'laporan', label: 'Laporan', icon: 'ti ti-clipboard-text', isOpen: false, subs: [
      { id: 'rekap-golongan', label: 'Rekap Golongan', path: '/rekap-golongan' },
      { id: 'rekap-kepramukaan', label: 'Rekap Kepramukaan', active: true, path: '/rekap-kepramukaan' },
      { id: 'rekap-data-potensi', label: 'Rekap Data Potensi', path: '/rekap-data-potensi' },
      { id: 'potensi-anggota', label: 'Potensi Anggota', path: '/potensi-anggota' },
      { id: 'presensi', label: 'Presensi', path: '/presensi' }
    ]
  },
  { id: 'kwartir', label: 'Kwartir', icon: 'ti ti-building', isOpen: false, subs: [
      { id: 'kwartir-nasional', label: 'Kwartir Nasional', path: '/kwartir-nasional' },
      { id: 'kwartir-daerah', label: 'Kwartir Daerah', path: '/kwartir-daerah' },
      { id: 'kwartir-cabang', label: 'Kwartir Cabang', path: '/kwartir-cabang' },
      { id: 'kwartir-ranting', label: 'Kwartir Ranting', path: '/kwartir-ranting' },
      { id: 'gugus-depan', label: 'Gugus Depan', path: '/Gugus Depan' },
    ]
  },
  { id: 'penghargaan', label: 'Penghargaan', icon: 'ti ti-comet', isOpen: false, subs: [
      { id: 'data-potensi', label: 'Data Potensi', path: '/data-potensi' },
      { id: 'pramuka-garuda', label: 'Pramuka Garuda', path: '/Pramuka Garuda' }
    ]
  },
  { id: 'mini-games', label: 'Mini Games', icon: 'ti ti-device-gamepad-2', path: '/mini-games' },
])

const openSide = (id) => {
  menus.value.forEach(item => {
    if (item.id === id) {
      item.isOpen = !item.isOpen
    } else {
      item.isOpen = false
    }
  })
}
</script>

<template>
  <aside id="logo-sidebar"
		class="fixed top-0 left-0 z-40 w-[16.25rem] h-screen transition-transform -translate-x-full shadow bg-netral-10 dark:bg-netral-100 dark:border-r-[0.1px] dark:border-netral-10 md:translate-x-0"
		aria-label="Sidebar">
		<div class="h-full px-3 sidebar">
      <a class="h-[4.5rem] mx-5 flex items-center cursor-pointer">
        <img src="../../assets/images/logo-ayopramuka-kwarnas.png" class="w-[11rem]" alt="ayopramuka kwarnas" />
      </a>
      <nav class="mt-2 mx-3 text-m">
        <div v-for="(side, index) in menus" :key="index">
          <a v-if="!side.subs" class="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer hover:bg-primary-light hover:text-netral-70" :class="side.active ? 'bg-primary text-netral-10':'text-netral-70'">
            <i :class="side?.icon" class="text-heading-s"></i>
            <span>{{ side.label }}</span>
          </a>
          <a v-else class="flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer text-netral-70 hover:bg-primary-light" @click="openSide(side.id)">
            <div class="flex items-center gap-3">
              <i :class="side?.icon" class="text-heading-s"></i>
              <span>{{ side.label }}</span>
            </div>
            <i :class="side.isOpen ? 'ti ti-chevron-up' : 'ti ti-chevron-down'" class="text-[20px]"></i>
          </a>
          <a v-for="(sub, idx) in side.subs" :key="idx" class="w-full flex flex-col ease-in duration-1000 rounded-lg" :class="sub.active ? 'bg-primary text-netral-10':'bg-white'">
            <div v-if="side.isOpen" class="flex gap-4 py-3 pl-5 pr-4 cursor-pointer items-center hover:rounded-lg hover:bg-primary-light hover:text-netral-70">
              <div class="rounded-full p-[0.15rem] border border-netral-50">
                <div class="rounded-full h-1 w-1" :class="sub.active ? 'bg-netral-10':''"></div> <!-- Posisi Aktive -->
              </div>
              <a class="hover:ease-in hover:duration-300 ">{{ sub.label }}</a>
            </div>
          </a>
        </div>
      </nav>
    </div>
  </aside>
</template>

<style>
.sidebar::-webkit-scrollbar {
	width: 5px;
	display: none;
}

.sidebar::-webkit-scrollbar-track {
	background-color: #eee;
}

.sidebar::-webkit-scrollbar-thumb {
	background-color: rgb(138, 133, 133);
}
</style>