const chokidar = require('chokidar')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const path = require('path')

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const { default: mocks } = require('./index.js')
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocks).length

  return {
    mockStartIndex: mockLastIndex - mockRoutesLength,
    mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((v) => {
    if (v.includes(mockDir)) {
      delete require.cache[require.resolve(v)]
    }
  })
}

module.exports = (app) => {
  require('@babel/register')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  chokidar.watch(mockDir, {
    ignored: /mock-server/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'add' || event === 'change') {
      try {
        app._router.stack.splice(mockStartIndex, mockRoutesLength)
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (err) {
        console.log(chalk.redBright(err))
      }
    }
  })
}
