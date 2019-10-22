<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
