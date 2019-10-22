<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
      <img v-if="logo" class="sidebar-logo" :src="logo">
      <h1 v-else class="sidebar-title">{{ title }}</h1>
    </router-link>
    <router-link v-else key="expand" class="sidebar-logo-link" to="/">
      <img v-if="logo" class="sidebar-logo" :src="logo">
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  components: {},
  mixins: [],
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Element Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  height: 50px;
  width: 100%;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;

  & .sidebar-logo-link {
    width:100%;
    height: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 600px;
      color: #fff;
      line-height: 50px;
      margin: 0;
      vertical-align: middle;
    }
  }
}
</style>
