import Mock from 'mockjs'

const requireContext = require('require-context')
const path = require('path')

const req = requireContext(path.join(__dirname, './modules'), false, /\.js$/)
const mocks = req.keys().reduce((ret, path) => {
  ret = ret.concat(req(path).default)
  return ret
}, [])

const responseFake = (url, type, respond) => {
  return {
    url: `/mock${url}`,
    type: type || 'get',
    response: (req, res) => {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map((mock) => {
  return responseFake(mock.url, mock.type, mock.response)
})
