<script setup>
import { ref, onMounted, watch } from "vue";

import InputSelect from "../InputSelect/index.vue";

import axios from "axios";

const emit = defineEmits([
  "update:selectedKwarda",
  "update:selectedKwarcab",
  "update:selectedKwarran",
  "update:selectedGudep",
]);

const props = defineProps({
  className: {
    type: String,
    default: "grid grid-cols-4 gap-2.5",
  },
  showKwarda: {
    type: Boolean,
    default: true,
  },
  showKwarcab: {
    type: Boolean,
    default: true,
  },
  showKwarran: {
    type: Boolean,
    default: true,
  },
  showGudep: {
    type: Boolean,
    default: true,
  },
  selectedKwarda: {
    type: Object,
    default: null,
  },
  selectedKwarcab: {
    type: Object,
    default: null,
  },
  selectedKwarran: {
    type: Object,
    default: null,
  },
  selectedGudep: {
    type: Object,
    default: null,
  },
  disabledKwarda: {
    type: Boolean,
    default: false,
  },
  disabledKwarcab: {
    type: Boolean,
    default: false,
  },
  disabledKwarran: {
    type: Boolean,
    default: false,
  },
  disabledGudep: {
    type: Boolean,
    default: false,
  },
  labelKwarda: {
    type: String,
    default: "Pilih Kwarda",
  },
  labelKwarcab: {
    type: String,
    default: "Pilih Kwarcab",
  },
  labelKwarran: {
    type: String,
    default: "Pilih Kwarran",
  },
  labelGudep: {
    type: String,
    default: "Pilih Gudep",
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorKwarda: {
    type: String,
    default: null,
  },
  errorKwarcab: {
    type: String,
    default: null,
  },
  errorKwarran: {
    type: String,
    default: null,
  },
  errorGudep: {
    type: String,
    default: null,
  },
  renderOption: {
    type: String,
    default: "sekolah_name",
  },
  getDesa: {
    type: Boolean,
    default: false,
  },
  baseURL: {
    type: String,
    default: "https://passport.ayosatu.xyz",
  },
});

const activeKwarda = ref(null);
const activeKwarcab = ref(null);
const activeKwarran = ref(null);
const activeGudep = ref(null);

const loadingProvinsi = ref(false);
const loadingKabupaten = ref(false);
const loadingKecamatan = ref(false);
const loadingGudep = ref(false);

const listProvinsi = ref([]);
const listKabupaten = ref([]);
const listKecamatan = ref([]);
const listGudep = ref([]);

watch(
  () => props.selectedKwarda,
  (val) => {
    activeKwarda.value = val;
    if (val && val.id) getKabupaten(val.id);
  }
);

watch(
  () => props.selectedKwarcab,
  (val) => {
    activeKwarcab.value = val;
    if (val && val.id) getKecamatan(val.id);
  }
);

watch(
  () => props.selectedKwarran,
  (val) => {
    activeKwarran.value = val;
    if (val && val.id) getGudep(val.id);
  }
);

watch(
  () => props.selectedGudep,
  (val) => {
    activeGudep.value = val;
  }
);

const getProvinsi = async () => {
  try {
    loadingProvinsi.value = true;
    let response = await axios.get(
      `${props.baseURL}/api/kepramukaan/reference/get-kwarda`
    );
    listProvinsi.value = response.data.data.filter(
      (res) => res[props.renderOption]
    );
  } catch (error) {
  } finally {
    loadingProvinsi.value = false;
  }
};

const getKabupaten = async (data) => {
  try {
    loadingKabupaten.value = true;
    let response = await axios.get(
      `${props.baseURL}/api/kepramukaan/reference/get-kwarcab/` + data
    );
    listKabupaten.value = response.data.data.filter(
      (res) => res[props.renderOption]
    );
  } catch (error) {
  } finally {
    loadingKabupaten.value = false;
  }
};

const getKecamatan = async (data) => {
  try {
    loadingKecamatan.value = true;
    let response = await axios.get(
      `${props.baseURL}/api/kepramukaan/reference/get-kwartir/` + data
    );
    listKecamatan.value = response.data.data.filter(
      (res) => res[props.renderOption]
    );
  } catch (error) {
  } finally {
    loadingKecamatan.value = false;
  }
};

const getGudep = async (data) => {
  try {
    loadingGudep.value = true;
    let url = props.getDesa
      ? `${props.baseURL}/api/general/ref/get-desa/`
      : `${props.baseURL}/api/kepramukaan/reference/get-pangkalan/`;
    let response = await axios.get(url + data);
    listGudep.value = response.data.data;
  } catch (error) {
  } finally {
    loadingGudep.value = false;
  }
};

const handleSelectKwarda = (e) => {
  emit("update:selectedKwarda", e);
  emit("update:selectedKwarcab", null);
  emit("update:selectedKwarran", null);
  emit("update:selectedGudep", null);

  listKabupaten.value = [];
  listKecamatan.value = [];
  listGudep.value = [];

  if (e && e.id) {
    getKabupaten(e.id);
  }
};

const handleSelectKwarcab = (e) => {
  emit("update:selectedKwarcab", e);
  emit("update:selectedKwarran", null);
  emit("update:selectedGudep", null);

  listKecamatan.value = [];
  listGudep.value = [];

  if (e && e.id) {
    getKecamatan(e.id);
  }
};

const handleSelectKwarran = (e) => {
  emit("update:selectedKwarran", e);
  emit("update:selectedGudep", null);

  listGudep.value = [];

  if (e && e.id) {
    getGudep(e.id);
  }
};

const handleSelectGudep = (e) => {
  emit("update:selectedGudep", e);
  activeGudep.value = e;
};

onMounted(() => {
  getProvinsi();
});
</script>

<template>
  <div :class="className">
    <InputSelect
      v-if="showKwarda"
      :options="listProvinsi"
      :renderOption="renderOption"
      :label="labelKwarda"
      :loading="loadingProvinsi"
      :placeholder="'Pilih'"
      :customSearch="false"
      :value="activeKwarda"
      :error="errorKwarda"
      :disabled="disabledKwarda"
      :required="required"
      @handleSelect="handleSelectKwarda"
    />
    <InputSelect
      v-if="showKwarcab"
      :options="listKabupaten"
      :renderOption="renderOption"
      :label="labelKwarcab"
      :loading="loadingKabupaten"
      :placeholder="'Pilih'"
      :customSearch="false"
      :value="activeKwarcab"
      :error="errorKwarcab"
      :disabled="disabledKwarcab"
      :required="required"
      @handleSelect="handleSelectKwarcab"
    />
    <InputSelect
      v-if="showKwarran"
      :options="listKecamatan"
      :renderOption="renderOption"
      :label="labelKwarran"
      :loading="loadingKecamatan"
      :placeholder="'Pilih'"
      :customSearch="false"
      :value="activeKwarran"
      :error="errorKwarran"
      :disabled="disabledKwarran"
      :required="required"
      @handleSelect="handleSelectKwarran"
    />
    <InputSelect
      v-if="showGudep"
      :options="listGudep"
      :renderOption="'name'"
      :label="labelGudep"
      :loading="loadingGudep"
      :placeholder="'Pilih'"
      :customSearch="false"
      :value="activeGudep"
      :error="errorGudep"
      :disabled="disabledGudep"
      :required="required"
      @handleSelect="handleSelectGudep"
    />
  </div>
</template>
