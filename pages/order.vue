<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>
            全部订单
            <i class="el-icon-arrow-right"></i>
          </dd>
          <dd>
            待付款
            <i class="el-icon-arrow-right"></i>
          </dd>
          <dd>
            待使用
            <i class="el-icon-arrow-right"></i>
          </dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <list :cur="cur"></list>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from "@/components/order/list";
export default {
  components: {
    List
  },
  data() {
    return {
      activeName: "all",
      list: [],
      cur: []
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    }
  },
  watch: {
    activeName(val) {
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0;
        } else if (val === "all") {
          return true;
        } else {
          return false;
        }
      });
    },
    list() {
      let val = this.name;
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0;
        } else if (val === "all") {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  async asyncData(ctx) {
    let {
      status,
      data: { code, list }
    } = await ctx.$axios.post("/order/getOrders");
    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map(item => {
          return {
            img: item.imgs.length
              ? item.imgs[0].url
              : "https://c.jiangwenqiang.com/api/logo.jpg",
            name: item.name,
            count: item.count,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        }),
        cur: list.map(item => {
          return {
            img: item.imgs.length
              ? item.imgs[0].url
              : "https://c.jiangwenqiang.com/api/logo.jpg",
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        })
      };
    }
  }
};
</script>

<style lang='scss'>
@import "@/assets/css/order/index.scss";
</style>
