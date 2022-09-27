<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
    type: {
      type: String,
      required: false,
      default: undefined,
    },
    value: {
      type: String,
      required: false,
      default: undefined,
    },
    danger: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  render(createElement) {
    const buttonClass = [
      'inline-block w-full p-4 font-medium text-white outline-none border-2 cursor-pointer text-center focus:bg-transparent hover:bg-transparent',
      {
        'bg-gray-600 border-gray-600 focus:border-black focus:text-black hover:border-black hover:text-black': !this.danger,
        'bg-red-600 border-red-600 focus:border-red-600 focus:text-red-600 hover:border-red-600 hover:text-red-600': this.danger,
      },
    ];
    return createElement(
      this.tag,
      {
        attrs: {
          type: this.type,
          value: this.value,
        },
        class: buttonClass,
      },
      this.$slots.default,
    );
  },
};
</script>
