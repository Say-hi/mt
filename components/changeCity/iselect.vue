<template>
  <div class="m-iselect">
    <span class="name">按省份选择</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select :disabled="!city.length" v-model="cvalue" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      cities: [],
      province: [],
      city: [],
      pvalue: "",
      cvalue: "",
      input: ""
    };
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, cb) {
      let self = this;
      if (self.cities.lenght) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1));
      } else {
        let {
          status,
          data: { city }
        } = await self.$axios.get("/geo/city");
        if (status === 200) {
          self.cities = city.map(item => {
            return {
              value: item.name
            };
          });
          cb(self.cities.filter(item => item.value.indexOf(query) > -1));
        } else {
          cb([]);
        }
      }
    }, 200),
    handleSelect(item) {
      console.log(item.value);
    }
  },
  watch: {
    async pvalue(newPvalue) {
      let self = this;
      let {
        status,
        data: { city }
      } = await self.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          };
        });
        self.cvalue = "";
      }
    }
  },
  async mounted() {
    let self = this;
    let {
      status,
      data: { province }
    } = await self.$axios.get("/geo/province");
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  }
};
</script>

<style>
@import "@/assets/css/changeCity/iselect.scss";
</style>
