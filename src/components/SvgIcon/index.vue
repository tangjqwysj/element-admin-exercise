<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass)
    },
    svgClass() {
      if (this.className !== '') {
        return `svg-icon ${this.className}`
      } else {
        return `svg-icon`
      }
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
}
.svg-external-icon {
  mask-size: cover;
  display: inline-block;
  background-color: currentColor;
}
</style>
