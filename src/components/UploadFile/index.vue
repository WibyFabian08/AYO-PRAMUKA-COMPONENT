<script>
import Button from "../commons/Button.vue";
import { IconX } from "@tabler/icons-vue";
export default {
  name: "Upload File",
  components: { Button, IconX },
  emits: ["update:files", "update:defaultFile", "handleUpload", "handleDelete"],
  props: {
    label: {
      type: String,
      default: "Pilih Berkas",
    },
    description: {
      type: String,
      default: "",
    },
    accept: {
      type: String,
      default: ".pdf,.doc,.docx,.xls,.xlsx,image/*",
    },
    maxFile: {
      type: Number,
      default: 2,
    },
    maxFileSize: {
      type: Number,
      default: 1,
    },
    defaultFile: {
      type: Array,
      default: () => [],
    },
    files: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: null,
    },
    uploadLabel: {
      type: String,
      default: null,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newFile: [],
      oldFile: [],
    };
  },
  computed: {
    renderFiles() {
      return [...this.newFile, ...this.oldFile];
    },
    computedDescription() {
      return this.description || `Jpg, png & pdf maks. ${this.maxFileSize}MB`;
    },
  },
  watch: {
    defaultFile(val) {
      this.oldFile = val;
    },
    files(val) {
      this.newFile = val;
    },
  },
  methods: {
    async convertFileToBase64(acceptFiles) {
      Array.from(acceptFiles).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.newFile.push({
            name: file?.name,
            value: reader.result,
          });
          this.$emit("update:files", this.newFile);
          this.$emit("handleUpload", this.newFile);
        };
        reader.onerror = (error) => {};
        reader.readAsDataURL(file);
      });
    },
    async handleChange(e) {
      const maxFileSize = this.maxFileSize * 1024 * 1024;

      for (const file of e.target.files) {
        if (file.size > maxFileSize) {
          alert(`File "${file.name}" melebihi batas ${this.maxFileSize}MB!`);
          // this.$openModalInfo({
          // 	message: `File "${file.name}" melebihi batas ${this.maxFileSize}MB!`,
          // 	title: 'Gagal',
          // 	type: 'error',
          // 	withTitle: true
          // })
          return;
        }
      }

      if (
        e.target.files.length + this.files.length + this.defaultFile.length >
        this.maxFile
      ) {
        alert(`Maksimal upload ${this.maxFile} file`);
        // this.$openModalInfo({
        // 	message: `Maksimal upload ${this.maxFile} file`,
        // 	title: 'Gagal',
        // 	type: 'error',
        // 	withTitle: true
        // })
        return;
      }
      await this.convertFileToBase64(e.target.files);
      this.$refs.uploadRef.value = null;
    },
    handleClick() {
      this.$refs.uploadRef.click();
    },
    handleRemove(data) {
      if (data.url) {
        this.oldFile = this.oldFile.filter((res) => res !== data);
        this.$emit("update:defaultFile", this.oldFile);
      } else {
        this.newFile = this.newFile.filter((res) => res.name !== data.name);
        this.$emit("update:files", this.newFile);
        this.$emit("handleDelete", this.newFile);
      }
    },
  },
  mounted() {
    this.oldFile = [...this.defaultFile];
  },
};
</script>

<template>
  <div class="w-full">
    <label v-if="uploadLabel" class="font-semibold text-netral-100 text-s">
      {{ uploadLabel }}
      <span
        v-if="isRequired"
        style="color: red; margin-left: 5px; font-size: 15px; font-weight: 500"
        >*</span
      >
    </label>
    <div
      style="cursor: pointer"
      :class="`${error ? 'input-error ' : 'border'}`"
      class="flex items-center gap-2 p-2 mb-2 rounded"
      @click="handleClick"
    >
      <Button>{{ label }}</Button>
      <p class="p-0 m-0 text-gray-400 text-s">
        {{ computedDescription }}
      </p>
      <input
        ref="uploadRef"
        class="hidden"
        type="file"
        name="uploadFile"
        id="uploadFile"
        :accept="accept"
        multiple
        @change="handleChange"
      />
    </div>

    <small v-if="error" style="color: red">{{ error }}</small>

    <template v-if="renderFiles.length > 0">
      <div
        class="flex items-center justify-between gap-2 p-2 mb-2 rounded bg-netral-40"
        v-for="(data, index) in renderFiles"
        :key="index"
      >
        <template v-if="data?.url">
          <a :href="data?.url || data?.value" target="_blank" style="flex: 1">
            <p
              class="flex-1 p-0 m-0 text-xs line-clamp-1 text-subtitle text-dark-900"
            >
              {{ data?.name }}
            </p>
          </a>
        </template>
        <template v-else>
          <p
            class="flex-1 p-0 m-0 text-s line-clamp-1 text-subtitle text-dark-900"
          >
            {{ data?.name }}
          </p>
        </template>
        <button
          style="height: 20px; width: 20px"
          @click="handleRemove(data)"
          class="flex items-center justify-center rounded bg-netral-20"
        >
          <IconX :size="16" />
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.input-error {
  border: 1px solid red;
}
</style>
