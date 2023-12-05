<script setup lang="ts">
import DateInput from './DateInput/Index.vue';

const onShowCallback = (val: string) => {
  console.log('vvv', val);
};
</script>

<template>
  <div>
    <DateInput
      @callback="onShowCallback"
      text-class="textClass"
      :show-icon="false"
    />
  </div>
</template>

<style>
.textClass {
  width: 160px !important;
}
.iconClass {
}
</style>
./DateInput/Index.vue
