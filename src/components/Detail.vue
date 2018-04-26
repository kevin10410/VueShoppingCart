<template>
    <div>
        <div>This is Detail</div>
        <button @click="backPage">Back</button>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    backPage() {
      this.$router.push(`/page/${this.currentPage}`);
    }
  },
  computed: {
    currentPage() {
      console.log(this.$store.state.currentPage);
      return this.$store.state.currentPage;
    }
  }
};
</script>

