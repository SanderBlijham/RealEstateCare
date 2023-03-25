<template>
  <router-view />
</template>

<script>
  export default {
    created() {
    this.$store.dispatch("fetchInspection");
    console.log(this.inspectionsData);
  }}
</script>
