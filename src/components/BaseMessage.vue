<template>
  <div :class="messageClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseMessage',
  props: {
    type: {
      type: String,
      required: false,
      default: 'info',
    },
  },
  computed: {
    messageClass() {
      return [
        'p-4 font-medium',
        {
          'bg-red-200': this.type === 'danger',
          'bg-yellow-200': this.type === 'info',
        },
      ];
    },
  },
};
</script>
