<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const dialogSetting = ref(false);
const dialogView = ref(false);

const tableData = [
  {
    id: "1001",
    name: "user1",
    phoneNum: "18888888888",
    mail: "288898884@user.com",
    idNum: "230123200012123456",
    job: "程序员",
    sex: "男",
    birthday: "2000-12-12",
    province: "黑龙江",
    city: "哈尔滨",
    district: "依兰县",
    status: "已冻结",
  },
  {
    id: "1001",
    name: "user1",
    phoneNum: "18888888888",
    mail: "288898884@user.com",
    idNum: "230123200012123456",
    job: "程序员",
    sex: "男",
    birthday: "2000-12-12",
    province: "黑龙江",
    city: "哈尔滨",
    district: "依兰县",
    status: "已冻结",
  },
  {
    id: "1001",
    name: "user1",
    phoneNum: "18888888888",
    mail: "288898884@user.com",
    idNum: "230123200012123456",
    job: "程序员",
    sex: "男",
    birthday: "2000-12-12",
    province: "黑龙江",
    city: "哈尔滨",
    district: "依兰县",
    status: "已冻结",
  },
  {
    id: "1001",
    name: "user1",
    phoneNum: "18888888888",
    mail: "288898884@user.com",
    idNum: "230123200012123456",
    job: "程序员",
    sex: "男",
    birthday: "2000-12-12",
    province: "黑龙江",
    city: "哈尔滨",
    district: "依兰县",
    status: "已冻结",
  },
  {
    id: "1001",
    name: "user1",
    phoneNum: "18888888888",
    mail: "288898884@user.com",
    idNum: "230123200012123456",
    job: "程序员",
    sex: "男",
    birthday: "2000-12-12",
    province: "黑龙江",
    city: "哈尔滨",
    district: "依兰县",
    status: "已冻结",
  },
];
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="user-search-condition-wrapper">
          <div>
            <el-input
              v-model="input_name"
              style="width: 220px"
              placeholder="输入姓名"
            />
            <el-input
              v-model="input_phone_num"
              style="width: 260px"
              placeholder="输入邮箱"
            />
            <el-input
              v-model="input_id_num"
              style="width: 250px"
              placeholder="输入身份证号"
            />
            <el-input
              v-model="input_phone_num"
              style="width: 200px"
              placeholder="输入手机号"
            />
            <el-input
              v-model="input_job"
              style="width: 150px"
              placeholder="输入职业"
            />
          </div>

          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="输入生日"
                :size="size"
              />
            </div>
          </div>
          <div>
            <el-select
              v-model="value"
              placeholder="请选择城市"
              style="width: 120px"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                >
                  {{ item.value }}
                </span>
              </el-option> </el-select
            ><el-select
              v-model="value"
              placeholder="请选择城市"
              style="width: 120px"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                >
                  {{ item.value }}
                </span>
              </el-option> </el-select
            ><el-select
              v-model="value"
              placeholder="请选择城市"
              style="width: 120px"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                >
                  {{ item.value }}
                </span>
              </el-option>
            </el-select>
          </div>

          <div class="selector-sex">
            <el-checkbox
              v-model="checked1"
              label="男"
              size="100"
              checked="true"
            />
            <el-checkbox
              v-model="checked2"
              label="女"
              size="100"
              checked="true"
            />
          </div>

          <div class="selector-status">
            <el-checkbox
              v-model="checked1"
              label="已冻结"
              size="120"
              checked="true"
            />
            <el-checkbox
              v-model="checked2"
              label="正常"
              size="120"
              checked="true"
            />
          </div>
          <div class="user-search-button">
            <el-button type="primary" round
              ><div class="search-button-icon">
                <el-icon><Search /></el-icon>
              </div>
              <span>搜索</span></el-button
            >
          </div>
        </div>
      </el-header>

      <!-- 主体表格部分 -->
      <el-main>
        <div class="user-main">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              align="center"
              fixed
              prop="id"
              label="编号"
              width="120"
            />
            <el-table-column
              align="center"
              prop="name"
              label="姓名"
              width="120"
            />
            <el-table-column
              align="center"
              prop="phoneNum"
              label="手机号"
              width="150"
            />
            <el-table-column
              align="center"
              prop="mail"
              label="邮箱地址"
              width="200"
            />
            <el-table-column
              align="center"
              prop="idNum"
              label="身份证号"
              width="180"
            />
            <el-table-column
              align="center"
              prop="job"
              label="职业"
              width="120"
            />
            <el-table-column
              align="center"
              prop="sex"
              label="性别"
              width="80"
            />
            <el-table-column
              align="center"
              prop="birthday"
              label="生日"
              width="120"
            />
            <el-table-column
              align="center"
              prop="province"
              label="省份"
              width="100"
            />
            <el-table-column
              align="center"
              prop="city"
              label="城市"
              width="100"
            />
            <el-table-column
              align="center"
              prop="district"
              label="区/县"
              width="100"
            />
            <el-table-column
              align="center"
              prop="status"
              label="状态"
              width="120"
            />
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="80"
            >
              <template #default>
                <el-button link type="primary" size="280" @click="dialogSetting = true">
                  <el-icon><Setting /></el-icon>
                </el-button>
                <el-button link type="primary" size="280" @click="dialogView = true"
                  ><el-icon><View /></el-icon
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pager-user-wrapper">
            <el-pagination background layout="prev, pager, next" :total="100" />
          </div>
        </div>
      </el-main>

		<!-- 对话框 -->
		<el-dialog
			v-model="dialogSetting"
			title="是否要更改用户状态"
			width="500"
			style="border-radius: 10px;"
			:before-close="handleClose"
		>
			<div>目前用户状态为:</div>
			<div>更改之后的用户状态为：</div>
			<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogSetting = false">取消</el-button>
				<el-button color="red" @click="dialogSetting = false">
				确定
				</el-button>
			</div>
			</template>
		</el-dialog>

		<el-dialog
			v-model="dialogView"
			title="用户信息"
			width="500"
			style="border-radius: 10px;"
			:before-close="handleClose"
		>
			<div>姓名：</div>
			<div>手机号：</div>
			<div>邮箱地址：</div>
			<div>身份证号：</div>
			<div>职业：</div>
			<div>性别：</div>
			<div>生日：</div>
			<div>地区：</div>
			<div>状态：</div>
		</el-dialog>

    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/user_mng.css";
</style>