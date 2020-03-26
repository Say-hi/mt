import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'
// const sing = 'abdc'

// import Redis from 'koa-redis';
// import nodeMailer from 'nodemailer';
// import User from '../dbs/models/user';
// import Passport from './utils/passport';
// import Email from '../dbs/config'


let router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async ctx => {
  let {status, data: {province,city}} = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async ctx => {
  let {status, data: {menu}} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/province', async ctx => {
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  let {status, data: {province}} = await axios.get('http://cp-tools.cn/geo/province')
  if (status === 200) {
    ctx.body = {
      province
    }
  } else {
    ctx.body = {
      province: []
    }
  }
})

export default router