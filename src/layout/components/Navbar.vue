<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <header-search class="right-menu-item" />
      </template>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger/index'
import Breadcrumb from '@/components/Breadcrumb/index'
import HeaderSearch from '@/components/HeaderSearch'
import { mapGetters } from 'vuex'
export default {
  components: {
    Hamburger,
    Breadcrumb,
    HeaderSearch
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  height:50px;
  overflow: hidden;
  background:#fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.hamburger-container{
  line-height: 46px;
  height:100%;
  cursor: pointer;
  float: left;
  transition:background .3s;
  &:hover{
    background:rgba(0, 0, 0, .025);
  }
}
.breadcrumb-container{
  float: left;
}
.right-menu{
  float:right;
  height:100%;
  line-height: 50px;
  .right-menu-item{
    height:100%;
  }
}
</style>
