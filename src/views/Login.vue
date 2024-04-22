<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const loginData = ref({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 16, message: "长度为5~16位非空字符", trigger: "blur" },
  ],
};
</script>

<template>
  <el-container>
    <el-main class="login-main-page">
      <div class="login-header">
        <img src="@/assets/nationalEmblem.png" class="login-logo" />
        <div class="login-title">政务服务好差评系统--管理员平台</div>
      </div>
      <div class="login-form">
        <div class="login-form-input">
          <el-form
            :label-position="labelPosition"
            label-width="auto"
            autocomplete="off"
            :model="loginData"
            :rules="rules"
            style="max-width: 500px"
          >
            <el-form-item label="用户名">
              <el-input v-model="loginData.username" />
            </el-form-item>
            <el-form-item label="密&nbsp;&nbsp;&nbsp;码">
              <el-input v-model="loginData.password" />
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox class="remenber-me">记住我</el-checkbox>
                    <el-button class="login-button" type="primary" auto-insert-space
                >登录</el-button>
                </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
@import "@/style/login.css";
</style>