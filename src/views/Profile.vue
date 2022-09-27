<template>
  <div
    class="bg-white w-full mx-auto max-w-sm p-10 flex flex-col gap-4"
    @submit.prevent="submit"
  >
    <img
      :src="user.photo"
      :alt="imgAlt"
      width="128"
      height="128"
      class="self-center"
    >
    <div class="self-center text-center mb-4">
      <h1 class="text-xl font-medium">
        {{user.full_name}}
      </h1>
      <h2 class="font-medium text-gray-600">
        {{user.position}}
      </h2>
    </div>
    <div>
      <h3 class="text-sm">Email:</h3>
      <h2 class="text-lg font-medium">{{ user.email }}</h2>
    </div>
    <div>
      <h3 class="text-sm">Phone:</h3>
      <h2 class="text-lg font-medium">{{ user.phone }}</h2>
    </div>
    <div>
      <h3 class="text-sm">Date of birth:</h3>
      <h2 class="text-lg font-medium">{{ user.dob }}</h2>
    </div>
    <div>
      <h3 class="text-sm">Location:</h3>
      <h2 class="text-lg font-medium">{{ user.location }}</h2>
    </div>
    <div>
      <h3 class="text-sm">Current time:</h3>
      <h2 class="text-lg font-medium">{{ user.time }}</h2>
    </div>
    <BaseButton
      danger
      @click.native="onLogout"
      class="mt-4"
    >Log Out</BaseButton>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'ProfilePage',
  components: { BaseButton },
  computed: {
    ...mapState(['user']),
    imgAlt() {
      return `UI-generated photo of ${this.user.full_name}`;
    },
  },
  created() {
    this.fetchProfile().catch(() => {
      this.onLogout();
    });
  },
  methods: {
    ...mapActions(['fetchProfile', 'logout']),
    onLogout() {
      this.logout().then(() => {
        this.$router.push('/auth');
      });
    },
  },
};
</script>
