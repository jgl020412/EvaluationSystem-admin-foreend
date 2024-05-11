<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { userLoginService } from "@/api/login.js";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token.js";

const router = useRouter();
const tokenStore = useTokenStore();

const loginData = ref({
  name: "",
  password: "",
});

const login = async () => {
  let result = await userLoginService(loginData.value);
  if (result.data.status == 200) {
    alert(result.data.msg ? result.data.msg : "登录成功");
    tokenStore.setToken(result.data.data.id, result.data.data.name);
    router.push("/center");
  } else {
    alert(result.data.msg ? result.data.msg : "登录失败");
  }
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
              <el-input v-model="loginData.name" />
            </el-form-item>
            <el-form-item label="密&nbsp;&nbsp;&nbsp;码">
              <el-input
                v-model="loginData.password"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-button"
                type="primary"
                auto-insert-space
                @click="login"
                >登录</el-button
              >
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