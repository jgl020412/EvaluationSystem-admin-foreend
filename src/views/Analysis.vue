<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="analysis-count">
          <el-row>
            <el-col :span="8" align="center">
              <el-statistic title="总人数" :value="562">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <User />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="8" align="center">
              <el-statistic title="总服务数量" :value="562">
                <template #prefix>
                  <el-icon style="vertical-align: -0.125em">
                    <Service />
                  </el-icon>
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="8" align="center">
              <el-statistic title="总评价数量" :value="562">
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
          <el-tab-pane label="用户满意度排行分析"><div class="service-evaluation-list"></div></el-tab-pane>
          <el-tab-pane label="总体评价等级占比分析"><div class="total-evaluation-pie"></div></el-tab-pane>
          <el-tab-pane label="用户地域占比分析"><div class="map-wrapper">
              <div id="mapChart" style="width: 800px; height: 500px"></div>
            </div></el-tab-pane>
          <el-tab-pane label="用户职业占比分析"><div class="pie-wrapper">
                <div
                  id="jobPie"
                  style="width: 800px; height: 400px; padding: 15px"
                ></div>
              </div></el-tab-pane>
        </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
@import "@/style/analysis.css";
</style>