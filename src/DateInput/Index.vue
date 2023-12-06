<template>
  <div class="date-text-container">
    <section class="date-text-row">
      <input
        type="text"
        const
        ref="txtDateRef"
        @keydown="onKeydown"
        @input="onInput"
        @blur="onBlur"
        v-model="txtDate"
        :readonly="props.readonly"
        :disabled="props.disabled"
        maxlength="19"
        :class="['date-text', { 'date-text-error': isError }, props.textClass]"
      />
      <slot>
        <img
          v-if="props.showIcon"
          src="./calendar.svg"
          class="date-text-calendar"
          @click="onShowCalendar"
          :class="props.iconClass"
        />
      </slot>
    </section>
    <section :class="['date-picker-container', { showDate: isShow }]">
      <VDatePicker v-model="date" @dayclick="onDayClick" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  textClass: String,
  iconClass: String,
  value: String,
  showIcon: {
    type: Boolean,
    default: true,
  },
});
const preValue = ref('');
const txtDate = ref(props.value);
const txtDateRef = ref();
const isError = ref(false);
const isBackspace = ref(false);
const date = ref(new Date());
const isShow = ref(false);

const emit = defineEmits(['callback']);

function isValidDate(time: string) {
  var regex = /^\d{4}-[0-1][0-2]-[0-3]\d$/;
  return regex.test(time);
}

function isValidDateTime(datetime: string) {
  var regex = /^\d{4}-\d{2}-\d{2} (?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
  return regex.test(datetime);
}

const onKeydown = (e) => {
  // 记录按的是否删除键
  isBackspace.value = e.key === 'Backspace';
  // 记录输入前的值
  preValue.value = e.target.value;
};

const onInput = (e) => {
  const val = e.target!.value;
  if (val.length === 0) {
    txtDate.value = '';
    isError.value = false;
    return;
  }
  const { selectionStart } = e.target;

  if (!isBackspace.value) {
    const reg = /^[1-9][0-9]{0,3}[0-9-\s:]*$/;
    if (reg.test(val)) {
      if (selectionStart === val.length) {
        const allNumber = val.replace(/[-\s:]/g, '');
        let year = '';
        let month = '';
        let day = '';
        let hour = '';
        let minute = '';
        if (allNumber.length === 4) {
          year = allNumber.substring(0, 4);
          txtDate.value = `${year}-`;
        }
        if (allNumber.length === 6) {
          year = allNumber.substring(0, 4);
          month = allNumber.substring(4, 6);
          txtDate.value = `${year}-${month}-`;
        }
        if (allNumber.length === 8) {
          year = allNumber.substring(0, 4);
          month = allNumber.substring(4, 6);
          day = allNumber.substring(6, 8);
          txtDate.value = `${year}-${month}-${day}`;
        }
        if (allNumber.length === 10) {
          year = allNumber.substring(0, 4);
          month = allNumber.substring(4, 6);
          day = allNumber.substring(6, 8);
          hour = allNumber.substring(8, 10);
          txtDate.value = `${year}-${month}-${day} ${hour}:`;
        }
        if (allNumber.length === 12) {
          year = allNumber.substring(0, 4);
          month = allNumber.substring(4, 6);
          day = allNumber.substring(6, 8);
          hour = allNumber.substring(8, 10);
          minute = allNumber.substring(10, 12);
          txtDate.value = `${year}-${month}-${day} ${hour}:${minute}:`;
        }
        if (allNumber.length === 13 || allNumber.length === 14) {
          // 判断是否有冒号
          if (
            allNumber.length === 13 &&
            txtDate.value?.substring(txtDate.value.length - 1) !== ':'
          ) {
            year = allNumber.substring(0, 4);
            month = allNumber.substring(4, 6);
            day = allNumber.substring(6, 8);
            hour = allNumber.substring(8, 10);
            minute = allNumber.substring(10, 12);
            let sec = allNumber.substring(12);
            txtDate.value = `${year}-${month}-${day} ${hour}:${minute}:${sec}`;
          } else {
            txtDate.value = val;
          }
        }
      } else {
        txtDate.value = val;
      }
    } else {
      txtDate.value = preValue.value;
      if (preValue.value.length === 0) {
        isError.value = false;
      }
    }
  }
  if (txtDate.value) {
    isError.value = !(isValidDateTime(val) || isValidDate(val));
  }
  emit('callback', txtDate.value);
};

const onBlur = (e) => {
  const val = e.target.value;
  if (val) {
    isError.value = !(isValidDateTime(val) || isValidDate(val));
    if (isValidDate(val)) {
      txtDate.value = `${val} 00:00:00`;
      emit('callback', txtDate.value);
    }
    const reg = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:$/;
    if (reg.test(val)) {
      txtDate.value = `${val}00`;
    }
    const reg1 = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
    if (reg1.test(val)) {
      txtDate.value = `${val}:00`;
    }
    isError.value = !(
      isValidDateTime(txtDate.value) || isValidDate(txtDate.value)
    );
  } else {
    isError.value = false;
  }
};

const onDayClick = (calendar) => {
  date.value = calendar.id;
  txtDate.value = `${calendar.id} ${dayjs(new Date()).format('HH:mm:ss')}`;
  emit('callback', txtDate.value);
  isShow.value = false;
};

const onShowCalendar = () => {
  if (!props.disabled && !props.readonly) {
    isShow.value = !isShow.value;
  }
};

const onSelectAll = (e) => {
  e.target.select();
};

watch(
  () => props.value,
  () => {
    txtDate.value = props.value;
  }
);
</script>

<style scoped>
.date-text-container {
  position: relative;
}
.date-text-row {
  display: flex;
  .date-text-calendar {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}
.date-picker-container {
  z-index: 99999;
  position: absolute;
  display: none;
}
.showDate {
  display: block;
}
.date-text {
  border: 1px solid rgb(220, 223, 230);
  padding: 4px 8px;
  &:focus {
    outline: none;
  }
}
.date-text-error {
  border: 1px solid red;
  &:focus {
    outline: 1px solid red;
  }
}
</style>
