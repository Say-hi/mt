import Router from 'koa-router';
// import axios from 'axios';
import Order from '../dbs/models/order';
import Cart from '../dbs/models/cart';

import CryptoJs from 'crypto-js';


let router = new Router({prefix: '/order'})

router.post('/createOrder', async ctx => {
  let {id, price, count} = ctx.request.body
  // console.log(ctx.request.body)
  let time = Date()
  let orderID = CryptoJs.MD5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '未登录'
    }
  } else {
    let findCart = await Cart.findOne({
      cartNo: id
    })
    let order = new Order({
      id: orderID,
      count,
      total: price * count,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      img: findCart.detail[0].imgs,
      status: Math.random() * 10 > 5 ? 1 : 0
    })
    console.log(order)
    try {
      let result = await order.save()
      if (result) {
        await findCart.remove()
        ctx.body = {
          code: 0,
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1,
          msg: 'fail'
        }
      }
    } catch(err) {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: '未登录'
    }
  } else {
    try {
      let result = await Order.find()
      // console.log(result)
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (err) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

export default router
