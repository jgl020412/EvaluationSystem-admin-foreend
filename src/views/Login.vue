<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

//定义数据模型
const registerData = ref({
  username: "",
  password: "",
});

//定义表单校验规则
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

//绑定数据,复用注册表单的数据模型
//表单数据校验
//登录函数
import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";

const router = useRouter();

// const tokenStore = useTokenStore();

import { userLoginService } from "@/api/login.js";
const login = async () => {
  //调用接口,完成登录
  let result = await userLoginService(registerData.value);
  if (result.status == 200) {
    alert(result.msg ? result.msg : "登录成功");
  } else {
    alert(res.data.msg);
  }
  router.push("/center");
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg">
      <el-item>
        <h1 class="title">政务服务好差评<br />管理员系统</h1>
      </el-item>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单 -->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="registerData"
        :rules="rules"
      >
        <el-form-item>
          <h1>请输入密码进行登录：</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerData.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
@import "@/style/login.css";
</style>