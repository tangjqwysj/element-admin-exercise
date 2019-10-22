const { notEmpty, needScriptOrTemp } = require('../utils.js')

module.exports = {
  description: 'generate vue component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name please',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'isLayout',
      message: 'if is Layout y or n'
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [
        {
          name: '<template>',
          value: 'template',
          checked: true
        },
        {
          name: '<script>',
          value: 'script',
          checked: true
        },
        {
          name: 'style',
          value: 'style',
          checked: true
        }
      ],
      validate: needScriptOrTemp()
    }
  ],
  actions: data => {
    const name = '{{properCase name}}'
    const actions = [
      {
        type: 'add',
        path: data.isLayout === 'y' ? `src/layout/components/Sidebar/${name}.vue`: `src/components/${name}/index.vue`,
        templateFile: 'plop-templates/component/index.hbs',
        data: {
          name: name,
          template: data.blocks.includes('template'),
          script: data.blocks.includes('script'),
          style: data.blocks.includes('style')
        }
      }
    ]

    return actions
  }
}
