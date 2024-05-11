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
              v-model="input_mail"
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
              style="width: 130px"
              placeholder="输入职业"
            />
          </div>

          <div class="demo-date-picker">
            <div class="block">
              <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="输入生日"
                :size="size"
              />
            </div>
          </div>
          <div>
            <el-select
              v-model="provinceId"
              placeholder="请选择省份"
              style="width: 120px"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
              </el-option> </el-select
            ><el-select
              v-model="cityId"
              placeholder="请选择城市"
              style="width: 120px"
            >
              <el-option
                v-for="item in city[provinceId]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
              </el-option> </el-select
            ><el-select
              v-model="districtId"
              placeholder="请选择区/县"
              style="width: 120px"
            >
              <el-option
                v-for="item in district[cityId]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </div>

          <div class="selector-sex">
            <el-checkbox v-model="man" label="男" size="100" checked="true" />
            <el-checkbox v-model="woman" label="女" size="100" checked="true" />
          </div>

          <div class="selector-status">
            <el-checkbox
              v-model="freeze"
              label="已冻结"
              size="120"
              checked="true"
            />
            <el-checkbox
              v-model="normal"
              label="正常"
              size="120"
              checked="true"
            />
          </div>
          <div class="user-search-button">
            <el-button type="primary" round @click="getUsersByCondition"
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
          <el-table :data="userList" style="width: 100%">
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
              width="210"
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
              :formatter="formatBirthday"
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
              <template #default="{ row }">
                <el-button
                  link
                  type="primary"
                  size="280"
                  @click="OpenChangeStatus(row)"
                >
                  <el-icon><Setting /></el-icon>
                </el-button>
                <el-button
                  link
                  type="primary"
                  size="280"
                  @click="showUserDetails(row)"
                  ><el-icon><View /></el-icon
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pager-user-wrapper">
            <el-pagination
              v-model:current-page="curPage"
              background
              layout="prev, pager, next"
              :page-count="maxPage"
              :total="total"
              @current-change="getUsers"
            />
          </div>
        </div>
      </el-main>

      <!-- 对话框 -->
      <el-dialog
        v-model="dialogSetting"
        title="是否要更改用户状态"
        width="500"
        style="border-radius: 10px"
        :before-close="handleClose"
      >
        <div>
          目前用户状态为:{{ userStatus.status == 0 ? "已冻结" : "正常状态" }}
        </div>
        <div>
          更改之后的用户状态为：{{
            userStatus.status == 1 ? "已冻结" : "正常状态"
          }}
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogSetting = false">取消</el-button>
            <el-button color="red" @click="changeStatus"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
        v-model="dialogView"
        title="用户信息"
        width="500"
        style="border-radius: 10px"
        :before-close="handleClose"
      >
        <div>姓名：{{ userDetails.name }}</div>
        <div>手机号：{{ userDetails.phone_num }}</div>
        <div>邮箱地址：{{ userDetails.mail }}</div>
        <div>身份证号：{{ userDetails.idNum }}</div>
        <div>职业：{{ userDetails.job }}</div>
        <div>性别：{{ userDetails.sex }}</div>
        <div>生日：{{ userDetails.birthday }}</div>
        <div>地区：{{ userDetails.place }}</div>
        <div>状态：{{ userDetails.status == 0 ? "已冻结" : "正常状态" }}</div>
      </el-dialog>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/user_mng.css";
</style>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
  userList,
  getUserList,
  changeUserStatus,
  getUserListByCondition,
} from "@/api/user.js";

import provinceData from "@/assets/json/province.json";
import cityData from "@/assets/json/city.json";
import countryData from "@/assets/json/country.json";
import provinceObject from "@/assets/json/province_object.json";
import cityObject from "@/assets/json/city_object.json";
import countryObject from "@/assets/json/country_object.json";

// 相关其他的搜索信息的数据模型
const input_id_num = ref("");
const input_name = ref("");
const input_mail = ref("");
const input_phone_num = ref("");
const input_job = ref("");
const birthday = ref("");
const man = ref(true);
const woman = ref(true);
const freeze = ref(true);
const normal = ref(true);

const searchUserBo = ref({
  birthday: "",
  city: "",
  district: "",
  id: "",
  idNum: "",
  job: "",
  mail: "",
  name: "",
  password: "",
  phoneNum: "",
  province: "",
  sex: "",
  status: "",
});

// 有关地区的选择的数据模型
const province = provinceData;
const city = cityData;
const district = countryData;
const provinceId = ref("");
const cityId = ref("");
const districtId = ref("");

const dialogSetting = ref(false);

// 有关用户详情展示的数据模型
const dialogView = ref(false);
const userDetails = ref({
  name: "",
  phone_num: "",
  mail: "",
  idNum: "",
  job: "",
  sex: "",
  birthday: "",
  place: "",
  status: "",
});

// 有关用户状态的展示的数据模型
const userStatus = ref({
  status: 1,
  id: "",
});

// 有关分页需要的数据模型
const curPage = ref(1); // 分页页数
const pageSize = ref(8); // 分页每页显示数量
const maxPage = ref(1); // 总页数
const total = ref(1); // 总记录数

const getUsers = async () => {
  let result = await getUserList(curPage.value, pageSize.value);
  if (result.data.status == 200) {
    userList.value = result.data.data.rows;
    maxPage.value = result.data.data.total;
    total.value = result.data.data.records;
  } else {
    alert(result.data.msg ? result.data.msg : "获取失败");
  }
};

getUsers();

const showUserDetails = async (row) => {
  userDetails.value.name = row.name;
  userDetails.value.phone_num = row.phoneNum;
  userDetails.value.mail = row.mail;
  userDetails.value.idNum = row.idNum;
  userDetails.value.job = row.job;
  userDetails.value.sex = row.sex;
  userDetails.value.birthday = row.birthday;
  userDetails.value.place = row.province + row.city + row.district;
  userDetails.value.status = row.status;
  dialogView.value = true;
};

const OpenChangeStatus = async (row) => {
  userStatus.value.id = row.id;
  userStatus.value.status = row.status;
  dialogSetting.value = true;
};

const changeStatus = async () => {
  let result = await changeUserStatus(
    userStatus.value.id,
    userStatus.value.status
  );
  if (result.data.status == 200) {
    alert("修改成功");
  } else {
    alert(result.data.msg ? result.data.msg : "修改失败");
  }
  getUsers();
  dialogSetting.value = false;
};

const getUsersByCondition = async () => {
  searchUserBo.value.name = input_name.value;
  searchUserBo.value.mail = input_mail.value;
  searchUserBo.value.idNum = input_id_num.value;
  searchUserBo.value.phoneNum = input_phone_num.value;
  searchUserBo.value.job = input_job.value;
  searchUserBo.value.birthday = birthday.value;

  if (provinceObject.hasOwnProperty(provinceId.value)) {
    searchUserBo.value.province = provinceObject[provinceId.value].name;
  }
  if (cityObject.hasOwnProperty(cityId.value)) {
    searchUserBo.value.city = cityObject[cityId.value].name;
  }
  if (countryObject.hasOwnProperty(districtId.value)) {
    searchUserBo.value.district = countryObject[districtId.value].name;
  }

  if (woman && man) {
    searchUserBo.value.sex = null;
  } else if (woman) {
    searchUserBo.value.sex = 0;
  } else {
    searchUserBo.value.sex = 1;
  }

  if (freeze && normal) {
    searchUserBo.value.status = null;
  } else if (freeze) {
    searchUserBo.value.status = 0;
  } else {
    searchUserBo.value.status = 1;
  }

  console.log(searchUserBo.value);

  let result = await getUserListByCondition(
    searchUserBo.value,
    curPage.value,
    pageSize.value
  );
  console.log(result.data);
  if (result.data.status == 200) {
    userList.value = result.data.data.rows;
    maxPage.value = result.data.data.total;
    total.value = result.data.data.records;
  } else {
    alert(result.data.msg ? result.data.msg : "查询失败");
  }
};
</script>