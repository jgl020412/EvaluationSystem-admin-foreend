<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="analysis-count">
          <el-row>
            <el-col :span="8" align="center">
              <el-statistic title="总人数" :value="userTotal">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <User />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="8" align="center">
              <el-statistic title="总服务数量" :value="serviceTotal">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <Service />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="8" align="center">
              <el-statistic title="总评价数量" :value="evaluationTotal">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <ChatLineRound />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="用户满意度排行分析"
              ><div class="service-evaluation-list"></div
            ></el-tab-pane>
            <el-tab-pane label="总体评价等级占比分析"
              ><div class="total-evaluation-pie">
                <div
                  ref="total_evaluation_pie_analysis"
                  style="width: 100%; height: 400px"
                ></div></div
            ></el-tab-pane>
            <el-tab-pane label="用户地域占比分析"
              ><div class="map-wrapper">
                <div
                  id="mapChart"
                  style="width: 800px; height: 500px"
                ></div></div
            ></el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/analysis.css";
</style>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import {
  serviceList,
  getServiceList,
  getTotalServiceCount,
} from "@/api/service.js";
import {
  evaluationList,
  getEvaluationList,
  getTotalEvaluationCount,
} from "@/api/evaluation.js";
import {
  userList,
  getUserList,
  getTotalUserCount,
} from "@/api/user.js";

const userTotal = ref(0)
const serviceTotal = ref(0)
const evaluationTotal = ref(0)

const getUserTotal = async() => {
  let result = await getTotalUserCount();
  if (result.data.status == 200) {
    userTotal.value = result.data.data
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败")
  }
}

const getEvaluationTotal = async() => {
  let result = await getTotalEvaluationCount();
  if (result.data.status == 200) {
    evaluationTotal.value = result.data.data
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败")
  }
}

const getServiceTotal = async() => {
  let result = await getTotalServiceCount();
  if (result.data.status == 200) {
    serviceTotal.value = result.data.data
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败")
  }
}

getUserTotal();
getEvaluationTotal();
getServiceTotal();

</script>