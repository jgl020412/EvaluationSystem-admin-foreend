<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const evaluationDialogVisiable = ref(false);

const evaluationData = ref([
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
  {
    id: "5000",
    serviceId: "3000",
    userId: "2000",
    content: "满分",
    level: 5,
    time: "2020-12-12 12:55:35",
  },
]);
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="evaluation-header-wrapper">
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
              style="width: 300px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="evaluation-time-search">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :shortcuts="shortcuts"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </div>
          <div class="evaluation-level-search">
            <el-input-number
              placeholder="输入星级"
              v-model="num"
              :min="1"
              :max="4"
              @change="handleChange"
            />
          </div>
          <div class="evaluation-button-search">
            <el-button type="primary"
              ><el-icon><Search /></el-icon>&nbsp;&nbsp;搜索</el-button
            >
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="evalution-main">
          <el-table
            :data="evaluationData"
            stripe
            height="450px"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              prop="serviceId"
              label="服务名称"
              width="180"
            />
            <el-table-column align="center" prop="content" label="内容" />
            <el-table-column
              align="center"
              prop="level"
              label="评价星级"
              width="100"
            />
            <el-table-column
              align="center"
              prop="time"
              label="时间"
              width="200"
            />
            <el-table-column align="center" label="查看" width="80"
              ><div class="evaluation-list-item-button">
                <el-button type="primary" circle @click="evaluationDialogVisiable = true"
                  ><el-icon><ChatDotRound /></el-icon
                ></el-button></div
            ></el-table-column>
          </el-table>
        </div>
      </el-main>

      <!-- 弹窗部分 -->
      <el-dialog  v-model="evaluationDialogVisiable" title="评价-" width="800">
        <div>评价内容</div>
        <div>评论内容</div>
        <div>回复</div>
      </el-dialog>

    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/evaluation_mng.css";
</style>