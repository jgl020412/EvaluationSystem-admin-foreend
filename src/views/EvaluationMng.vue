<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div>
          <div>
            <el-input
              v-model="input"
              style="width: 240px"
              placeholder="输入用户名称"
              clearable
            />
          </div>
          <div class="evaluation-service-search">
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="输入服务名称"
              :remote-method="remoteMethod"
              :loading="加载中"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/evaluation_mng.css";
</style>