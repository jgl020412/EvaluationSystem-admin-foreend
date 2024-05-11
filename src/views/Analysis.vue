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
              ><div class="tag-page">
                <div>
                  <el-segmented v-model="levelStr" :options="levelStrs" block @change="createHistogramChart" />
                </div>
                <div>
                  <div id="histogramChart" class="histogram"></div>
                </div></div
            ></el-tab-pane>
            <el-tab-pane label="总体评价等级占比分析"
              ><div class="tab-page">
                <div id="levelChart" class="chart"></div></div
            ></el-tab-pane>
            <el-tab-pane label="用户地域占比分析"
              ><div class="tab-page">
                <div id="mapChart" class="chart"></div></div
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
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import chinaJson from "@/assets/json/china.json";
import {
  serviceList,
  getServiceList,
  getTotalServiceCount,
} from "@/api/service.js";
import {
  evaluationList,
  getEvaluationList,
  getTotalEvaluationCount,
  getLevelRatio,
  analysisEvaluation,
} from "@/api/evaluation.js";
import {
  userList,
  getUserList,
  getTotalUserCount,
  getUserRegionRatio,
} from "@/api/user.js";

const userTotal = ref(0);
const serviceTotal = ref(0);
const evaluationTotal = ref(0);

const getUserTotal = async () => {
  let result = await getTotalUserCount();
  if (result.data.status == 200) {
    userTotal.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};

const getEvaluationTotal = async () => {
  let result = await getTotalEvaluationCount();
  if (result.data.status == 200) {
    evaluationTotal.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};

const getServiceTotal = async () => {
  let result = await getTotalServiceCount();
  if (result.data.status == 200) {
    serviceTotal.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};

getUserTotal();
getEvaluationTotal();
getServiceTotal();

onMounted(() => {
  createHistogramChart();
  createPie();
  createMap();
});

const createPie = async () => {
  var mydata = null;

  let result = await getLevelRatio();
  if (result.data.status == 200) {
    mydata = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
    return;
  }

  let myChart = echarts.init(document.getElementById("levelChart"));
  let option = {
    title: {
      text: "扇形统计图",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 10,
      data: [
        "零星评价",
        "一星评价",
        "二星评价",
        "三星评价",
        "四星评价",
        "五星评价",
      ],
    },
    series: [
      {
        name: "评价数据",
        type: "pie",
        radius: "50%",
        center: ["50%", "60%"],
        data: mydata,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(200, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};

const createMap = async () => {
  var mydata = null;

  let result = await getUserRegionRatio();
  if (result.data.status == 200) {
    mydata = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
    return;
  }

  echarts.registerMap("china", chinaJson);

  let optionMap = {
    tooltip: {
      trigger: "item",
    },

    //左侧小导航图标
    visualMap: {
      show: true,
      x: "left",
      y: "center",
      splitList: [
        { start: 50000, end: 80000 },
        { start: 80000, end: 100000 },
        { start: 30000, end: 50000 },
        { start: 10000, end: 30000 },
        { start: 5000, end: 10000 },
        { start: 3000, end: 5000 },
        { start: 1000, end: 3000 },
        { start: 0, end: 1000 },
      ],
      // color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#e6ac53', '#9fb5ea']
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"],
      },
    },
    visualMap: {
      min: 1,
      max: 100, // 粉丝数范围，可以自定义  100000
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        color: [
          "#5475f5",
          "#9feaa5",
          "#85daef",
          "#74e2ca",
          "#e6ac53",
          "#9fb5ea",
        ],
      },
    },

    //配置属性
    series: [
      {
        name: "数据",
        type: "map",
        mapType: "china",
        roam: true,
        label: {
          normal: {
            show: true, //省份名称
          },
          emphasis: {
            show: false,
          },
        },
        // data: list,
        data: mydata, //数据
      },
    ],
  };

  //初始化echarts实例
  let myChart = echarts.init(document.getElementById("mapChart"));

  //使用制定的配置项和数据显示图表
  myChart.setOption(optionMap);
};

const levelStr = ref("零星评价");

const levelStrs = [
  "零星评价",
  "一星评价",
  "二星评价",
  "三星评价",
  "四星评价",
  "五星评价",
];

const mapLevel = {
  零星评价: 0,
  一星评价: 1,
  二星评价: 2,
  三星评价: 3,
  四星评价: 4,
  五星评价: 5,
}

const createHistogramChart = async () => {

  console.log(mapLevel[levelStr.value])

  let result = await analysisEvaluation(mapLevel[levelStr.value]);
  let serviceName = null;
  let count = null;
  if (result.data.status == 200) {
    serviceName = result.data.data.map(obj => obj.serviceName);
    count = result.data.data.map(obj => obj.count);
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败")
  }

  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("histogramChart"));
  const option = {
    xAxis: {
      type: "value",
    },
    tooltip: {},
    yAxis: {
      type: "category",
      data: serviceName,
    },
    series: [
      {
        type: "bar",
        data: count,
      },
    ],
  };

  myChart.setOption(option);
};
</script>