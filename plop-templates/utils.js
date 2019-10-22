module.exports = {
  notEmpty: name => {
    return v => {
      if (!v || v.trim === '') {
        return `${name} is required`
      } else {
        return true
      }
    }
  },
  needScriptOrTemp: () => {
    return v => {
      if (!v.includes('script') || !v.includes('template')) {
        return 'Components require at least a <script> or <template> tag.'
      } else {
        return true
      }
    }
  }
}
