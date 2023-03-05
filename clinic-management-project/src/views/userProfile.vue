<template>
  <h1>alo</h1>
</template>
<script>
export default {
  name: "UserProfile",
  data() {
    return {
      username: "",
      email: "",
    };
  },
  methods: {
    handleSubmit() {
      // handle form submission here
      console.log(
        "Submitting form with username:",
        this.username,
        "and email:",
        this.email
      );
    },
  },
};
</script>
