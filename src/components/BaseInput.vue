<template>
<label
  :for="inputId"
  class="block mb-4"
>
  <span class="sr-only">{{ label }}</span>
  <input
    :id="inputId"
    :name="inputId"
    :type="inputType"
    :class="inputClass"
    :value="value"
    :placeholder="label"
    @input="onInput"
  >
</label>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    inputId: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    danger: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    inputClass() {
      return [
        'block w-full p-4 bg-white outline-none border-2 !border-black shadow-none',
        {
          'border-2 !border-red-500': this.danger,
        },
      ];
    },
  },
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value);
    },
  },
};
</script>
