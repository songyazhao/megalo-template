import Fly from 'flyio'
import API from './apiUrl'
import Config from './config'
const request = new Fly()

// - 异常情况的错误处理
const errorFunction = (err, tipConfig, promise) => {
  // - 如果有异常需要提示
  if (!tipConfig.errorAction && tipConfig.isErrorDefaultTip) {
    Config.resError.tipShow(err)
  } else {
    return promise.reject(err)
  }
}

let promises = [] // - 接收接口请求的promise数组
let loadingTimer = null // - loading的定时器

request.interceptors.request.use((config) => {
  const connectId = Symbol(config.url) // - 创建本次请求的loading标识
  const tipConfig = { ...Config.tipConfig, ...config.tipConfig } // - 默认配置和传入的配置混合

  promises.push(connectId)
  config.baseURL = Config.baseURL
  config.connectId = connectId

  // - 开启loading
  clearTimeout(loadingTimer) // - 多个接口时需要清除上一个loading
  loadingTimer = setTimeout(() => {
    tipConfig.isLoading && Config.loading.show()
  }, Config.loading.limitTime)

  return config
})

request.interceptors.response.use(
  (response, promise) => {
    const result = response.data
    const index = promises.indexOf(response.request.connectId)
    const tipConfig = { ...Config.tipConfig, ...response.request.tipConfig } // - 默认配置和传入的配置混合

    promises.splice(index, 1) // - 移除当前的loading标记
    if (promises.length === 0) {
      clearTimeout(loadingTimer) // - 当请求在xxxms内完成则直接清除loading计时器
      tipConfig.isLoading && Config.loading.hide() // - 当promise全部加载完成则隐藏loading
    }

    // - 运行成功的判断
    if (result[Config.resSuccess.key] === Config.resSuccess.value) {
      return promise.resolve(result)
    } else {
      return errorFunction(result, tipConfig, promise)
    }
  },
  (err, promise) => {
    return errorFunction(err, {}, promise)
  }
)

const serializeObject = method => {
  return {
    value: (url, ...arg) => request[method](API[url] || url || '', ...arg),
    writable: false,
    configurable: false,
    enumerable: false
  }
}

const handleRequest = Object.create(null, {
  get: serializeObject('get'),
  post: serializeObject('post'),
  delete: serializeObject('delete'),
  head: serializeObject('head'),
  patch: serializeObject('patch'),
  put: serializeObject('put')
})

// - extend Fly
for (const [key, value] of Object.entries(request)) {
  handleRequest[key] = value
}

export default handleRequest
