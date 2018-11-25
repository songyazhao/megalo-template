const API = {
  'user.info': '/client/user', // - 用户信息
  'user.session': '/client/user/code2session', // - code换sessionKey
  'user.save': '/client/user/save', // - 更新或者新增用户信息到数据库
  'goods.list': '/client/goods', // - 商品列表
  'goods.detail': '/client/goods/detail', // - 商品详情
  'cart.list': '/client/cart', // - 购物车商品信息
  'cart.add': '/client/cart', // - 添加购物车
  'cart.del': '/client/cart', // - 删除购物车
  'pay.invoke': '/client/pay/invoke' // - 调起支付
}

export default API
