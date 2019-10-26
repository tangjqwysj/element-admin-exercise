<template>
  <div class="header-search" :class="{'show':show}">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      placeholder="Search"
      :remote-method="querySearch"
      filterable
      remote
      default-first-option
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join('>')" />
    </el-select>
  </div>
</template>

<script>
import path from 'path'
import Fuse from 'fuse.js'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      show: false,
      searchPool: [],
      fuse: null
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      }
    },
    searchPool(list) {
      this.initFuse(list)
    }
  },
  created() {},
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    change(route) {
      this.$router.push(route.path)
      this.search = ''
      this.close()
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      })
    },
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let ret = []
      for (const route of routes) {
        if (route.hidden) {
          continue
        }
        let data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixTitle]
        }
        if (route.meta && route.meta.title) {
          data.title = [...data.title, route.meta.title]
          if (route.redirect !== 'noRedirect') {
            ret.push(data)
          }
        }
        if (route.children) {
          let childrenArrayRet = this.generateRoutes(route.children, route.path, data.title)
          if (childrenArrayRet.length >= 1) {
            ret = [...ret, ...childrenArrayRet]
          }
        }
      }
      return ret
    },
    close() {
      this.show = false
      this.options = []
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
    },
    click() {
      this.show = !this.show
      console.log(this.show)
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size:0;
  .search-icon{
    font-size:18px;
    vertical-align: middle;
    cursor: pointer;
  }

  .header-search-select {
    width: 0;
    font-size:18px;
    overflow: hidden;
    transition:width .2s;
    display:inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      padding: 0;
      border: 0;
      border-bottom:1px solid #d9d9d9;
      border-radius:0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
