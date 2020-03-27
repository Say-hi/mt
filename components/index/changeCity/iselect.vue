<template>
  <div class="m-iselect">
    <span class="name">按省份选择</span>
    <el-select v-model="pvalue" placeholder='省份'>
      <el-option v-for='item in province'
       :key='item.value'
        :label='item.label'
         :value='item.value'></el-option>
    </el-select>
    <el-select v-model="cvalue" placeholder='城市'>
      <el-option v-for='item in city'
       :key='item.value'
        :label='item.label'
         :value='item.value'></el-option>
    </el-select>
    <el-autocomplete v-model='input'
     :fetch-suggestions='querySearchAsync'
      placeholder='请输入城市中文或拼音'
       @select="handleSelect"></el-autocomplete>
  </div>
</template>

<script>
export default {
  data(){
    return {
      province: [],
      city: [],
      pvalue: '',
      cvalue: '',
      input: ''
    }
  },
  methods: {
    querySearchAsync () {},
    handleSelect(){}
  },
}
</script>

<style>
@import '@/assets/css/changeCity/iselect.scss';
</style>
