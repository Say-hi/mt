<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select></i-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot></hot>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy></categroy>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from "@/components/changeCity/iselect";
import Hot from "@/components/changeCity/hot";
import Categroy from "@/components/changeCity/Categroy";
export default {
  components: {
    iSelect,
    Hot,
    Categroy
  }
};
</script>

<style>
</style>
