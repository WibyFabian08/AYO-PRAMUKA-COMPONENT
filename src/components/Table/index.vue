<script setup>
import Loading from "../commons/Loading.vue";
import NoData from "../commons/NoData.vue";
import {
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-vue";

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showCheck: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["handleSort", "handleCheck", "handleCheckAll"]);

const handleSort = (row) => {
  if (row.isSort.activeSort === "ASC") {
    row.isSort.activeSort = "DESC";
  } else if (row.isSort.activeSort === "DESC") {
    row.isSort.activeSort = "ASC";
  } else if (row.isSort.activeSort === "asc") {
    row.isSort.activeSort = "desc";
  } else {
    row.isSort.activeSort = "asc";
  }
  emit("handleSort", row);
};

const handleCheck = ($event) => {
  emit("handleCheck", $event);
};

const handleCheckAll = (data) => {
  emit("handleCheckAll", data);
};
</script>

<template>
  <div class="overflow-x-auto border border-b-0 rounded-xl border-netral-40">
    <table class="w-full">
      <thead class="border-b border-netral-40">
        <tr>
          <template v-for="(row, index) in rows" :key="index">
            <th
              v-if="row.isSort"
              class="cursor-pointer text-nowrap align-middle text-s font-bold text-netral-100 capitalize px-[10px] py-[14px] bg-netral-30"
              @click="handleSort(row)"
              :style="`width: ${row.width ? row.width : ''}; text-align: ${
                row.align ? row.align : 'center'
              }`"
            >
              <div
                class="flex items-center gap-1"
                :class="{
                  'flex-row-reverse': row.align === 'right',
                  'flex-row': row.align !== 'right',
                }"
              >
                <span
                  v-if="row.align !== 'left' && row.align !== 'right'"
                ></span>
                <span>{{ row?.label }}</span>
                <span class="flex flex-col items-center">
                  <IconTriangleFilled
                    :strokeWidth="0"
                    :color="
                      row.isSort.activeSort === 'ASC' ||
                      row.isSort.activeSort === 'asc'
                        ? '#2E3A44'
                        : '#D9D9D9'
                    "
                    :size="6"
                  />
                  <IconTriangleInvertedFilled
                    :strokeWidth="0"
                    :color="
                      row.isSort.activeSort === 'DESC' ||
                      row.isSort.activeSort === 'desc'
                        ? '#2E3A44'
                        : '#D9D9D9'
                    "
                    :size="6"
                  />
                </span>
              </div>
            </th>
            <th
              v-else-if="row.type == 'checklist'"
              class="text-nowrap align-middle text-s font-bold text-netral-100 capitalize px-[10px] py-[14px] bg-netral-30"
              :style="`width: ${row.width ? row.width : ''}; text-align: ${
                row.align ? row.align : 'center'
              }`"
            >
              <div class="flex items-center justify-center gap-1">
                <div class="flex items-center justify-center">
                  <div
                    @click="handleCheckAll(row?.onCheck)"
                    class="w-5 h-5 bg-gray-200 rounded cursor-pointer"
                    :class="{ 'bg-primary': row?.onCheck }"
                  ></div>
                </div>
              </div>
            </th>
            <th
              v-else-if="row.isChecked"
              class="text-nowrap align-middle text-s font-bold text-netral-100 capitalize px-[10px] py-[14px] bg-netral-30"
              :style="`width: ${row.width ? row.width : ''}; text-align: ${
                row.align ? row.align : 'center'
              }`"
            >
              <div class="flex items-center gap-1">
                <span>{{ row.label }}</span>
                <input
                  v-if="showCheck"
                  @change="handleCheck($event)"
                  class="w-4 h-4 rounded-full primary accent-purple-600"
                  type="checkbox"
                  id="flexCheckDefault"
                  :value="row.isChecked.checked"
                  v-model="row.isChecked.checked"
                />
              </div>
            </th>
            <th
              v-else
              class="text-nowrap align-middle text-s font-bold text-netral-100 capitalize px-[10px] py-[14px] bg-netral-30"
              :style="`width: ${row.width ? row.width : ''}; text-align: ${
                row.align ? row.align : 'center'
              }`"
            >
              {{ row.label }}
            </th>
          </template>
        </tr>
      </thead>
      <Loading v-if="loading" :type="'table'" :colCount="rows.length" />
      <tbody v-if="columns.length === 0 && !loading">
        <tr>
          <td class="" :colspan="rows.length">
            <NoData />
          </td>
        </tr>
      </tbody>
      <tbody v-if="columns.length > 0 && !loading">
        <tr
          v-for="(column, index) in columns"
          :key="index"
          :class="`${
            index !== column.length ? 'border-b border-netral-40' : ''
          }`"
        >
          <td
            v-for="row in rows"
            :key="row.field"
            class="align-middle px-[10px] py-2 text-s text-netral-100 font-semibold"
            :style="`width: ${row.width ? row.width : ''}; text-align: ${
              row.align ? row.align : 'center'
            }`"
          >
            <slot
              name="table-content"
              :row="row"
              :column="column"
              :index="index"
            >
              {{ column[row.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  width: 17px;
  height: 17px;
  border-radius: 15px;
}
</style>
