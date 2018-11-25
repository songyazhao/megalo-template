// - MyPlugin
import request from '@/helpers/request'
import validator from '@/helpers/validator'
import { baseURL } from '@/helpers/request/config'

export default {
  /**
   * 自定义方法
   * 组件内使用：this.$validator, this.$request
   * 全局使用：Vue.validator, Vue.request
   */
  install (Vue) {
    const $validator = {
      configurable: false,
      writable: true,
      enumerable: false,
      value: validator
    }
    const $request = {
      ...$validator,
      value: request
    }
    const $baseURL = {
      ...$validator,
      value: baseURL
    }

    Object.defineProperties(Vue.prototype, { $validator, $request, $baseURL })
    Object.defineProperties(Vue, { validator: $validator, request: $request })
  }
}
