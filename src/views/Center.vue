<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { userLogoutService } from "@/api/login.js";
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";

const router = useRouter();
const tokenStore = useTokenStore();

const tabPosition = ref("left");

const doLogout = async () => {
  let result = await userLogoutService(tokenStore.token.adminId);
  if (result.status == 200) {
    tokenStore.removeToken();
    router.push("/login");
    alert(result.data.msg ? result.data.msg : "退出成功");
  } else {
    alert(result.data.msg ? result.data.msg : "退出失败");
  }
};

</script>

<template>
  <div>
    <el-container class="page">
      <!-- 头部 -->
      <el-header>
        <div id="whiteHeader" class="white-header">
          <div class="head_wrapper">
            <img src="@/assets/nationalEmblem.png" class="center-logo" />

            <h1 class="center-title">政务服务好差评系统--管理员平台</h1>

            <div class="right-me-info">
              <span class="me-nickname">{{ tokenStore.token.name }}</span>
              <span class="sep-line">|</span>
              <span class="logout" @click="doLogout">退出登录</span>
            </div>
          </div>
        </div>
      </el-header>

      <el-container>
        <!-- 中心部分 -->
        <el-main>
          <el-tabs
            :tab-position="tabPosition"
            class="demo-tabs"
          >
            <el-tab-pane label="服务管理">
              <div class="main">
                <service-mng class="mng" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户管理">
              <div class="main">
                <user-mng class="mng" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="评价管理">
              <div class="main">
                <evaluation-mng class="mng" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="统计与分析">
              <div class="main">
                <analysis class="mng" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>

        <!-- 页脚 -->
        <el-footer>
          <div class="footer">
            <div class="all-words-wrapper">
              <a
                class="footer-link"
                href="https://www.evaluation.com"
                target="_blank"
                >政务服务好差评管理员系统</a
              >
              <span class="dian"> | </span>
              <a
                class="footer-link"
                href="https://www.samr.gov.cn/"
                target="_blank"
                >国家市场监督管理局</a
              >
              <span class="dian"> | </span>
              <a
                class="footer-link"
                href="https://gjzwfw.www.gov.cn/index.html"
                target="_blank"
                >国家政务服务平台</a
              >
              <span class="dian"> | </span>
              <a
                class="footer-link"
                href="https://hcp.samr.gov.cn/gbeval/html/guide.html"
                target="_blank"
                >政务服务好差评系统</a
              >
              <span class="dian"> | </span>
              <a
                class="footer-link"
                href="https://github.com/jgl020412/EvaluationSystem"
                target="_blank"
                >Github</a
              >
              <span class="dian" style="font-size: 12px; margin-left: 20px"
                >Copyright © 2020 JGL.evaluatino.com All Rights Reserved</span
              >
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
@import "@/style/container_center.css";
</style>