<script setup>
import { ref, onMounted } from "vue";
import { IconPlus, IconEdit, IconTrash } from "@tabler/icons-vue";

// import InputText from "@/components/basics/InputText.vue";
import Modal from "@/components/basics/Modal.vue";
import InputSelect from "@/components/basics/InputSelect.vue";
import MultipleSelect from "@/components/basics/MultipleSelect.vue";
import Timelines from "@/components/basics/Timelines.vue";
import UploadFile from "@/components/basics/UploadFile.vue";
import InputOtp from "@/components/basics/InputOtp.vue";
import Tab from "@/components/basics/Tab.vue";
import Table from "@/components/basics/Table.vue";
import MultiSelect from "@/components/basics/MultiSelect.vue";
import Select from "@/components/basics/Select.vue";
import Badge from "@/components/basics/Badge.vue";
import Select2 from "@/components/basics/Select2.vue";
import AddComment from "@/components/commons/AddComment.vue";
import EmojiPicker from "../../components/commons/EmojiPicker.vue";
import GlobalLoading from "../../components/basics/GlobalLoading.vue";
import InputText from "@/components/InputText/index.vue";
import InputNumber from "@/components/InputNumber/index.vue";
import InputTextArea from "@/components/InputTextArea/index.vue";
import InputDate from "@/components/InputDate/index.vue";
import TextEditor from "../../components/commons/TextEditor.vue";
import Switch from "../../components/basics/Switch.vue";
import NoData from "../../components/commons/NoData.vue";
import TableComponent from "@/components/Table/index.vue";
import PaginationComponent from "@/components/Pagination/index.vue";
import SelectKwartir from "@/components/SelectKwartir/index.vue";
import Button from "../../components/commons/Button.vue";
import PageLoader from "../../components/commons/PageLoader.vue";
import RenderImage from "../../components/commons/RenderImage.vue";
import DropdownButton from "../../components/commons/DropdownButton.vue";
import RenderList from "../../components/commons/RenderList.vue";
import InputPassword from "../../components/InputPassword/index.vue";
import CheckboxText from "../../components/basics/CheckboxText.vue";
import UploadFileBase64 from "../../components/UploadFile/index.vue";
import InputSelectSearch from "../../components/InputSelect/index.vue";

const tableRow = [
  {
    label: "No",
    field: "index",
  },
  {
    label: "Gambar",
    field: "foto",
    align: "center",
  },
  {
    label: "Judul",
    align: "left",
    field: "title",
    width: "200px",
  },
  {
    label: "Tanggal Dibuat",
    align: "left",
    isSort: {
      activeSort: "",
      key: "sort_by_date",
    },
    field: "tanggal_utc",
  },
];

const tabList = [
  "Pramuka",
  "Pramuka",
  "sdasasa asasasa",
  "dsdsasa dsdsd",
  "dsdsds",
];
const files = ref([]);
const defaultFiles = ref([]);
const dropdownRef = ref(null);
const selectedTab = ref("Pramuka");
const content = ref("");
const isPublistApp = ref(false);
const stuff = [
  {
    name: "Nama Barang",
    type: "name",
  },
  {
    name: "Tanggal",
    type: "date",
  },
  {
    name: "Harga",
    type: "number",
  },
  {
    name: "Waktu",
    type: "time",
  },
];

const badgeList = [
  "primary",
  "success",
  "warning",
  "error",
  "info",
  "disabled",
];
const plannerForm = ref({
  id: "",
  judul: "",
  waktu_mulai: "",
  tanggal: "",
  waktu_selesai: "",
  catatan: "",
  pengingat: null,
  berulang: {
    name: null,
  },
  hari: [],
  timezone: "",
});

const form = ref({});
const errorForm = ref({});

const tableConfig = ref({
  current: 1,
  total: 10,
  perPage: 2,
});

const dayOption = [
  {
    name: "Minggu",
    id: "minggu",
  },
  {
    name: "Senin",
    id: "senin",
  },
  {
    name: "Selasa",
    id: "selasa",
  },
  {
    name: "Rabu",
    id: "rabu",
  },
  {
    name: "Kamis",
    id: "kamis",
  },
  {
    name: "Jumat",
    id: "jumat",
  },
  {
    name: "Sabtu",
    id: "sabtu",
  },
];

const dummyData = [
  {
    name: "Taufik Hidayat",
    date: "23 Januari 2024",
    price: "10000",
    time: "13:00",
  },
  {
    name: "Azmi Sirojuddin",
    date: "22 Januari 2024",
    price: "5000",
    time: "17:00",
  },
  {
    name: "Boby Sulistio",
    date: "21 Januari 2024",
    price: "20000",
    time: "20:00",
  },
];

const handleUploadBase64 = (e) => {
  alert("upload");
};

const handleDeleteBase64 = (e) => {
  alert("delete");
};

const handleListDay = (value) => {
  plannerForm.value.hari = value;
};

const pagination = (pn) => {
  tableConfig.value.current = pn;
};

const handleSelect = (e) => {};

const showModal = ref(false);
const selectedValue = ref({
  id: 1,
  text: "Opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  description:
    "Ini opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  imageUrl:
    "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
});
const selectedOptions = ref([
  // {
  //   id: 1,
  //   text: "Opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  //   description:
  //     "Ini opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  //   imageUrl:
  //     "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  // },
  // {
  //   id: 7,
  //   text: "Opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  //   description:
  //     "Ini opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
  //   imageUrl:
  //     "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  // },
]);
const file = ref([]);

const options = [
  {
    id: 1,
    text: "Opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 2,
    text: "Opsi dummy 2 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 2 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 3,
    text: "Opsi dummy 3 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 3 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 4,
    text: "Opsi dummy 4 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 4 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 5,
    text: "Opsi dummy 5 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 5 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 6,
    text: "Opsi dummy 6 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 6 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 7,
    text: "Opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 8,
    text: "Opsi dummy 8 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 8 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 9,
    text: "Opsi dummy 9 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    description:
      "Ini opsi dummy 9 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
  {
    id: 10,
    text: "Opsi dummy 10 dengan isi yang sangat panjang sekali percobaan soalnya ini.0",
    description:
      "Ini opsi dummy 10 dengan isi yang sangat panjang sekali percobaan soalnya ini.0",
    imageUrl:
      "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
  },
];

const timelinesItems = [
  {
    date: "2024-05-01",
    description: "lorem ipsum dolor sit amet",
    hour: "10:00",
    event: "Event 1",
  },
  {
    date: "2024-05-02",
    description: "lorem ipsum dolor sit amet",
    hour: "10:00",
    event: "Event 2",
  },
  {
    date: "2024-05-03",
    description: "lorem ipsum dolor sit amet",
    hour: "10:00",
    event: "Event 3",
  },
];

onMounted(() => {
  setTimeout(() => {
    form.value.dummy = {
      name: "Boby Sulistio",
      date: "21 Januari 2024",
      price: "20000",
      time: "20:00",
    };
    selectedOptions.value = [
      {
        id: 1,
        text: "Opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
        description:
          "Ini opsi dummy 1 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
        imageUrl:
          "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
      },
      {
        id: 7,
        text: "Opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
        description:
          "Ini opsi dummy 7 dengan isi yang sangat panjang sekali percobaan soalnya ini.",
        imageUrl:
          "https://asset.kompas.com/crops/p6EWWLI5WTTZawGDYLRQnNXvYKU=/800x3222:4000x5356/1200x800/data/photo/2022/08/08/62f0d0b5464bd.jpg",
      },
    ];
    // isPublistApp.value = true
    files.value = [
      {
        value:
          "https://www.refoindonesia.com/wp-content/uploads/2022/08/Pramuka-Kecerdasan-Emosional-dan-Generasi-Emas-2045--1024x640.jpg",
        name: "Lampiran",
      },
    ];
    content.value = "<p>tetetet</p>";
    form.value.kabupaten_id = {
      id: 1103,
      name: "KAB. ACEH SELATAN",
      kode: "01",
      description: "KABUPATEN ACEH SELATAN",
      propinsi_id: "11",
      sekolah_id: 4560,
      sekolah_name: "KWARCAB ACEH SELATAN",
    };
  }, 5000);
});
</script>

<template>
  <div class="relative">
    <div class="text-xl font-bold">All Components</div>
    <!-- <GlobalLoading /> -->
    <p class="mb-5">Badge</p>
    <div class="flex gap-2">
      <Badge
        v-for="(item, index) in badgeList"
        :key="index"
        :label="item"
        :badge-type="item"
      />
    </div>
    <p class="mt-10">Input Text</p>
    <InputText />
    <p class="mt-10">Input Text Label</p>
    <InputText label="Label" />
    <p class="mt-10">Input Text Icon</p>
    <InputText label="Label" />
    <InputText className="mb-5" type="text" label="Email" :iconLeft="true">
      <template #iconLeft><i class="ti ti-mail text-primary"></i></template>
    </InputText>

    <p class="mt-10">Input OTP</p>
    <InputOtp />
    <p class="mt-10">Dropdown</p>
    <div class="flex items-center gap-5">
      <MultiSelect
        label="Hari"
        :optionsProps="dayOption"
        v-model:selected="plannerForm.hari"
        :renderedOption="'id'"
        :error="null"
        @handleSelect="handleListDay"
      />
      <Select label="Hari" :options-props="dayOption" />
      <Select2 label="Hari" :options-props="dayOption" />
    </div>
    <p class="mt-10 mb-5">Tabs</p>
    <div class="space-y-2">
      <Tab :tabList="tabList" :active-tab="selectedTab" />
      <Tab :tabList="tabList" type="border" :active-tab="selectedTab" />
    </div>

    <p class="mt-10">Table</p>
    <Table
      :is-checkbox="true"
      :table-head="stuff"
      :table-rows="dummyData"
      :-pagination-config="tableConfig"
      @page-change="pagination($event)"
    />

    <p class="mt-10 mb-5">Add Comment</p>
    <div class="w-1/2">
      <AddComment />
    </div>
    <div>
      <p>Modal</p>
      <button @click="showModal = true" type="button" class="button-primary">
        Show modal
      </button>
      <Modal :isVisible="showModal" @update:isVisible="showModal = $event">
        <template #header>
          <h3>Example title</h3>
        </template>
        <template #body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            doloremque cupiditate iure aperiam natus laborum nisi amet
            perspiciatis repellat. Optio, eum error incidunt accusantium
            expedita corrupti quod magnam reiciendis beatae?
          </p>
        </template>
        <!-- apabila modalnya tidak perlu footer maka template footer tidak perlu ada -->
        <template #footer>
          <button
            @click="showModal = false"
            type="button"
            class="button-primary"
          >
            Accept
          </button>
          <button
            @click="showModal = false"
            type="button"
            class="button-primary-outline"
          >
            Decline
          </button>
        </template>
      </Modal>
    </div>

    <div class="grid grid-cols-3 gap-3 mb-20">
      <div class="col">
        <h1>Contoh Penggunaan InputSelect</h1>
        <InputSelect
          v-model="selectedValue"
          :options="options"
          title="text"
          caption="description"
          images="imageUrl"
        />
        <!-- <p>Terpilih: {{ selectedValue }}</p> -->
      </div>

      <div class="col">
        <h1>Contoh Penggunaan MultipleSelect</h1>
        <MultipleSelect
          v-model="selectedOptions"
          :options="options"
          title="text"
          caption="description"
          images="imageUrl"
          :error="null"
        />
        <p>Selected Options: {{ selectedOptions }}</p>
      </div>

      <div class="col">
        <h1>Contoh Penggunaan Timeline</h1>
        <Timelines
          :items="timelinesItems"
          title="event"
          caption="description"
          time="date"
        />
      </div>

      <div class="col">
        <h1>Contoh Penggunaan Upload File</h1>
        <UploadFile :maxSize="4000000" :maxFiles="3" v-model="file" />
      </div>

      {{ file }}

      <EmojiPicker
        :iconColor="'#9E3CB9'"
        :buttonClass="'bg-[#F5CFFF] h-7 w-7 rounded-lg border border-primary'"
        :className="'-bottom-80'"
        @handleSelect="handleSelect"
      />
    </div>

    {{ form }}

    <div class="grid grid-cols-2 gap-5 mb-5">
      <div class="">
        <InputPassword
          :label="'Password'"
          :placeholder="'Password'"
          v-model:value="form.tempat_lahir"
          :required="true"
          :error="null"
          :disabled="true"
        >
        </InputPassword>
      </div>
      <div class="">
        <InputText
          :label="'Tempat Lahir'"
          :placeholder="'Kota/Kabupaten'"
          v-model:value="form.tempat_lahir"
          :required="true"
          :error="null"
          :disabled="true"
          :iconRight="true"
        >
          <template #iconRight>
            <div>Icon</div>
          </template>
        </InputText>
      </div>
      <div class="">
        <InputDate
          :label="'Tanggal Lahir'"
          :placeholder="'Tanggal Lahir'"
          v-model:value="form.tanggal_lahir"
          :required="true"
          :disabled="false"
          :error="null"
          @handleChange="(e) => (form.tanggal_lahir = e)"
        />
      </div>
    </div>

    <div class="mb-5">
      <InputNumber
        :label="'Nomor Telepon (WhatsApp)'"
        :required="true"
        :placeholder="'+62'"
        v-model:value="form.no_telp"
        :error="null"
        :disabled="true"
        :iconRight="true"
      >
        <template #iconRight>
          <div>Icon</div>
        </template></InputNumber
      >
    </div>
    <div class="mb-5">
      <InputText
        :label="'Email'"
        :placeholder="'Email'"
        v-model:value="form.email"
        :required="true"
        :error="null"
        :textTransform="'normal'"
      />
    </div>
    <hr class="my-5 text-neutral-300" />
    <div class="mb-3">
      <InputTextArea
        :label="'Alamat'"
        :required="true"
        :disabled="true"
        :placeholder="'Alamat Utama'"
        v-model:value="form.alamat_primer"
        :error="null"
      />
    </div>

    {{ content }}
    <TextEditor
      :label="'Text Editor'"
      :required="true"
      :value="content"
      :placeholder="'Text Editor'"
      @handleInput="(e) => (content = e)"
    />

    <Switch v-model:isActive="isPublistApp" />

    <NoData />

    <TableComponent
      :rows="tableRow"
      :columns="[]"
      :loading="false"
    ></TableComponent>

    <div class="w-60">
      <Button
        :buttonType="'outline'"
        :className="'w-full'"
        :isDisabled="true"
        :loading="true"
        >Publish</Button
      >
    </div>

    <Button :iconOnly="true" :buttonType="'danger'"
      ><IconTrash :size="15"
    /></Button>

    <PaginationComponent
      :defaultLimit="10"
      :defaultPage="1"
      :pagenation="{
        first_page_url:
          'https:\/\/passport.ayosatu.xyz\/api\/v2\/article\/list\/kwartir?page=1',
        last_page_url:
          'https:\/\/passport.ayosatu.xyz\/api\/v2\/article\/list\/kwartir?page=10',
        prev_page_url: null,
        next_page_url:
          'https:\/\/passport.ayosatu.xyz\/api\/v2\/article\/list\/kwartir?page=2',
        total: 92,
      }"
      @PageTo="pageTo"
    />
  </div>

  <SelectKwartir
    :getDesa="true"
    :className="'grid grid-cols-2 gap-5'"
    :labelKwarda="'Provinsi'"
    :labelKwarcab="'Kabupaten'"
    :labelKwarran="'Kecamatan'"
    :labelGudep="'Kelurahan'"
    :disabledKwarda="true"
    :disabledKwarcab="false"
    :disabledKwarran="false"
    :disabledGudep="false"
    :errorKwarda="errorForm.provinsi_id"
    :errorKwarcab="errorForm.kabupaten_id"
    :errorKwarran="errorForm.kecamatan_id"
    :errorGudep="errorForm.desa_id"
    :required="true"
    :renderOption="'name'"
    v-model:selectedKwarda="form.provinsi_id"
    v-model:selectedKwarcab="form.kabupaten_id"
    v-model:selectedKwarran="form.kecamatan_id"
    v-model:selectedGudep="form.desa_id"
  />

  <RenderImage
    :className="'h-20 w-20 rounded-full border border-netral-100 overflow-hidden flex items-center justify-center bg-white'"
    :src="'https://encrypted-tbn0.gstatic.co/images?q=tbn:ANd9GcTRrg2zSZBYSJbXjObSKPL3M2CLuwYFuw2NbQ&s'"
    :objectFit="'cover'"
  />

  <div>
    <DropdownButton
      :id="`haloo`"
      :isFull="true"
      :is-persist="true"
      ref="dropdownRef"
    >
      <template #button>
        <button class="text-primary">Haloo Dunia</button>
      </template>
      <template #content>
        <li>
          <button
            @click="dropdownRef?.handleClose()"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Earnings
          </button>
        </li>
        <li>
          <button
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </template>
    </DropdownButton>
  </div>

  <RenderList :loading="false" :data="tableRow">
    <!-- <template #loading>
      <div>Loading...</div>
    </template> -->
    <template #content>
      <div v-for="(res, index) in tableRow" :key="index">
        {{ res?.label }}
      </div>
    </template>
    <!-- <template #empty>
      <div>Data Kosong</div>
    </template> -->
  </RenderList>

  <div class="flex items-center gap-2">
    <CheckboxText
      :value="isPublistApp"
      @handle-check="(e) => (isPublistApp = e)"
      :label="'Haloo Ini Checkbox'"
    />

    {{ isPublistApp }}
  </div>

  <UploadFileBase64
    :maxFile="1"
    :maxFileSize="2"
    :label="'Pilih Berkas'"
    :uploadLabel="`Syarat Sertifikat Yang Harus Diunggah`"
    :accept="'.jpg,.png,.jpeg,.pdf'"
    :description="'Jpg, png, pdf maks. 2MB'"
    v-model:files="files"
    v-model:defaultFile="defaultFiles"
    :error="null"
    @handle-upload="handleUploadBase64"
    @handle-delete="handleDeleteBase64"
    :is-required="false"
  />

  <InputSelectSearch
    :options="dummyData"
    :renderOption="'name'"
    :label="'Pilih Data'"
    :loading="false"
    :placeholder="'Pilih'"
    :customSearch="false"
    :value="form.dummy"
    :error="null"
    :disabled="false"
    :required="true"
    @handleSelect="(e) => (form.dummy = e)"
  />

  <!-- <PageLoader/> -->
</template>
