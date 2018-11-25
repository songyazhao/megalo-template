const isDev = process.env.NODE_ENV === 'development'

export const baseURL = isDev ? '/' : '/' // 在这里可以设置本地开发和线上请求地址

export default {
  baseURL,
  // - 关于接口loading的配置
  loading: {
    limitTime: 200, // - 接口请求在xxxms内完成则不展示loading
    show: () => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    },
    hide: () => {
      wx.hideLoading()
    }
  },
  // - 接口请求的默认配置
  tipConfig: {
    isLoading: true, // - 是否展示loading，默认为true
    isErrorDefaultTip: true, // - 是否展示默认错误提示，默认为true
    errorAction: false // - 是否使用自定义的错误处理方法，默认为false，如设置true则需在views层catch错误
  },
  // - 运行成功的判别标识  例如res.code === '50000'即成功
  resSuccess: {
    key: 'code', // - 与后台规定的表示响应成功的变量
    value: 50000 // - 与后台规定的表示响应成功code
  },
  // - 异常情况
  resError: {
    // - 异常默认提示的方法
    tipShow: (err) => {
      wx.showToast({
        title: (err && (err.msg || err.message)) || '服务器升级中，请稍后重试。',
        icon: 'none',
        mask: true
      })
    }
  }
}
