<template>
<div id="app">
  <router-view/>
</div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    error: '',
  }),

  methods: {},
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
