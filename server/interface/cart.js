import Router from 'koa-router';
// import axios from 'axios';
import Cart from '../dbs/models/cart';
import CryptoJs from 'crypto-js';


let router = new Router({prefix: '/cart'})

router.post('/create', async ctx => {

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请登录账号'
    }
  } else {
    let time = Date()
    let cartNo = CryptoJs.MD5(Math.random() * 1000 + time).toString()
    // console.log(cartNo)
    let {params: {id, detail}} = ctx.request.body
    // console.log('id',id)
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async ctx => {
  let {id: cartNo} = ctx.request.body
  // console.log(cartNo)
  try {
    let result = await Cart.findOne({cartNo: cartNo})
    console.log(result)
    ctx.body = {
      code: 0,
      data: result?result.detail[0]: {}
    }
  }catch (e) {
    ctx.body ={
      code: -1,
      data: {},
      msg: '获取错误'
    }
  }
})

export default router
