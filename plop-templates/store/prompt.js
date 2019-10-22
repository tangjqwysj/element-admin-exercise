const { notEmpty } = require('../utils')
module.exports = {
  description: 'generate vue store modules',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [
        {
          name: 'state',
          value: 'state',
          checked: true
        },
        {
          name: 'mutations',
          value: 'mutations',
          checked: true
        },
        {
          name: 'actions',
          value: 'actions',
          checked: true
        }
      ]
    }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [
      {
        type: 'add',
        path: `src/store/modules/${name}.js`,
        templateFile: 'plop-templates/store/index.hbs',
        data: {
          name: name,
          state: data.blocks.includes('state'),
          mutations: data.blocks.includes('mutations'),
          actions: data.blocks.includes('actions')
        }
      }
    ]

    return actions
  }
}
