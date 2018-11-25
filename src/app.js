import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import MyPlugin from '@/plugins'

Vue.use(VHtmlPlugin)
Vue.use(MyPlugin)

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/hello/hello'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'megalo-template',
      navigationBarTextStyle: 'black'
    }
  }
}
