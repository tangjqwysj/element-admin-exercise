<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar } from './components/index'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
