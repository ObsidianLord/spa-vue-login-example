<template>
  <div class="max-w-sm w-full">
    <h1 class="text-center font-medium text-5xl sm:text-6xl mb-6">Welcome.</h1>
    <form
      action="/"
      method="post"
      novalidate="true"
      class="w-full mx-auto p-6 sm:p-10 bg-white"
      @submit.prevent="submit"
    >
      <BaseMessage
        v-for="(error, i) in errors"
        :key="i"
        type="danger"
        class="mb-4"
      >
        {{ error }}
      </BaseMessage>
      <BaseInput
        input-id="email"
        input-type="email"
        label="Email"
        :danger="isEmailError"
        v-model="email"
      />
      <BaseInput
        input-id="password"
        input-type="password"
        label="Password"
        :danger="isPasswordError"
        v-model="password"
      />
      <BaseButton
        tag="input"
        type="submit"
        value="Log In"
      >Log In</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseMessage from '@/components/BaseMessage.vue';

const STATUS_ERROR_UNAUTHORIZED = 401;

export default {
  name: 'AuthPage',
  components: {
    BaseButton,
    BaseInput,
    BaseMessage,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    };
  },
  computed: {
    isEmailError() {
      return this.errors.some((err) => /email/i.test(err));
    },
    isPasswordError() {
      return this.errors.some((err) => /password/i.test(err));
    },
  },
  methods: {
    ...mapActions(['login']),
    submit() {
      this.errors = [];

      if (!this.email) {
        this.errors.push('You did not enter an email.');
      }

      if (!this.password) {
        this.errors.push('You did not enter a password.');
      }

      if (!this.errors.length) {
        this.login({
          email: this.email,
          password: this.password,
        })
          .then(() => {
            this.$router.push('/profile');
          })
          .catch((error) => {
            if (error.response.status === STATUS_ERROR_UNAUTHORIZED) {
              this.errors.push('The email address or password is incorrect');
            } else if (error.message) {
              this.errors.push(error.message);
            } else {
              this.errors.push('Unknown error');
            }
          });
      }
    },
  },
};
</script>
