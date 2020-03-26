<template>
  <div class="m-menu" @mouseleave="mouseleave">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in $store.state.home.menu" :key="index" @mouseenter="enter">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="v in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      menu: [
        {
          type: "food",
          name: "美食",
          child: [
            {
              title: "美食",
              child: ["代金券", "火锅"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          child: [
            {
              title: "外卖",
              child: ["代金券", "火锅"]
            }
          ]
        },
        {
          type: "hotel",
          name: "酒店",
          child: [
            {
              title: "酒店",
              child: ["代金券", "火锅"]
            }
          ]
        }
      ]
    };
  },
  methods: {
    sover() {
      clearTimeout(this._timer);
    },
    sout() {
      this.kind = "";
    },
    mouseleave() {
      let self = this;
      self._timer = setTimeout(() => {
        self.kind = "";
      }, 150);
    },
    enter(e) {
      console.log(e);
      this.kind = e.target.querySelector("i").className;
      console.log(this.kind);
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0];
    }
  }
};
</script>

<style>
</style>
