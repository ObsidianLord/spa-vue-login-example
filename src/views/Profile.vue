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
    <div class="self-center text-center">
      <div class="text-xl font-medium">
        {{user.full_name}}
      </div>
      <div class="font-medium text-gray-600">
        {{user.position}}
      </div>
    </div>
    <div>
      <div class="text-sm">Email:</div>
      <div class="text-lg font-medium">{{ user.email }}</div>
    </div>
    <div>
      <div class="text-sm">Phone:</div>
      <div class="text-lg font-medium">{{ user.phone }}</div>
    </div>
    <div>
      <div class="text-sm">Date of birth:</div>
      <div class="text-lg font-medium">{{ user.dob }}</div>
    </div>
    <div>
      <div class="text-sm">Location:</div>
      <div class="text-lg font-medium">{{ user.location }}</div>
    </div>
    <div>
      <div class="text-sm">Current time:</div>
      <div class="text-lg font-medium">{{ user.time }}</div>
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
