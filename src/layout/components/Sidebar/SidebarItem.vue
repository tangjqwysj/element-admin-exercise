<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        :item="child"
        :is-nest="true"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './Link'
import { isExternal } from '@/utils/validate.js'
import path from 'path'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    Item
  },
  mixins: [],
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isNest: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.onlyOneChild = null
  },
  mounted() {},
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((child, i) => {
        if (child.hidden) {
          return false
        } else {
          this.onlyOneChild = child
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
