<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部内容 -->
      <el-header>
        <div class="service-search">
          <el-input
            v-model="input_search_name"
            placeholder="请输入服务名称"
            clearable
          />
        </div>
        <div class="search-button">
          <el-icon
            ><el-button @click="getServicesByName"><search /></el-button
          ></el-icon>
        </div>
        <div class="service-insert">
          <el-button
            type="primary"
            class="insert-button"
            @click="insert_dialogVisible = true"
            >新增服务</el-button
          >
        </div>
      </el-header>

      <!-- 主页展示 -->
      <el-main>
        <div>
          <el-table :data="serviceList" class="service-table" height="480">
            <el-table-column fixed prop="id" label="编号" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="department" label="部门" />
            <el-table-column fixed="right" label="操作" width="160">
              <template #default="{ row }">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="showDetails(row)"
                >
                  <el-icon size="20"><View /></el-icon>
                </el-button>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="showUpdateDialog(row)"
                >
                  <el-icon size="20"><Edit /></el-icon>
                </el-button>

                <el-popconfirm title="确定删除？请慎重考虑" @confirm="confirmDelete(row)">
                  <template #reference>
                    <el-button link type="primary" size="small">
                      <el-icon size="20" color="red"><DeleteFilled /></el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

      <!-- 弹窗 -->
      <!-- 新增服务弹窗 -->
      <el-dialog
        v-model="insert_dialogVisible"
        title="新增服务"
        width="500"
        style="border-radius: 10px"
        :before-close="handleClose"
      >
        <div>
          <div class="insert-dialog-text">名称：</div>
          <el-input
            v-model="insertService.name"
            placeholder="请输入服务名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">部门：</div>
          <el-input
            v-model="insertService.department"
            placeholder="请输入部门名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">详情：</div>
          <el-input
            v-model="insertService.details"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
            placeholder="可选择性地输入详情内容"
          />
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="clearInsert">清空</el-button>
            <el-button @click="insert_dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmInsert"> 完成 </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 展示详情弹窗 -->
      <el-dialog
        v-model="view_dialogVisible"
        title="详情内容"
        width="500"
        style="border-radius: 10px"
        :before-close="handleClose"
      >
        <div>
          <el-descriptions>
            <el-descriptions-item>{{serviceView.details}}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-dialog>

      <!-- 更新服务弹窗 -->
      <el-dialog
        v-model="update_dialogVisible"
        title="编辑服务"
        width="800"
        style="border-radius: 10px"
        :before-close="handleClose"
      >
        <div>
          <div class="insert-dialog-text">原名称：{{serviceView.name}}</div>
          <div></div>
          <div class="insert-dialog-text">新名称：</div>
          <el-input
            v-model="updateService.name"
            placeholder="请输入更改后的服务名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">原部门：{{serviceView.department}}</div>
          <div class="insert-dialog-text">部门：</div>
          <el-input
            v-model="updateService.department"
            placeholder="请输入更改后的部门名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">原详情内容{{serviceView.details}}</div>
          <div class="insert-dialog-text">新详情：</div>
          <el-input
            v-model="updateService.details"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
            placeholder="可选择性地输入更改后的详情内容"
          />
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="clearUpdate">重置</el-button>
            <el-button @click="update_dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmUpdate"> 完成 </el-button>
          </div>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/service_mng.css";
</style>


<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";

import {
  serviceList,
  getServiceListByName,
  getServiceList,
  updateOrModifyService,
  deleteService
} from "@/api/service.js";

// 搜索框中的服务名称数据模型
const input_search_name = ref("");

// 查看服务的数据模型
const view_dialogVisible = ref(false);
const serviceView = ref({
  name : "",
  department :  "",
  id : "",
  details : ""
});

// 新增服务的弹出窗控制数据模型
const insert_dialogVisible = ref(false);
const insertService = ref({
  name: "",
  department: "",
  id : null,
  details: "",
});

// 编辑服务的数据模型
const update_dialogVisible = ref(false);
const updateService = ref({
  id: "",
  name: "",
  department: "",
  details: "",
});

const confirmInsert = async () => {
  console.log(insertService.value)
  let result = await updateOrModifyService(insertService.value);
  if (result.data.status == 200) {
    alert("添加成功");
  } else {
    alert(result.data.msg ? result.data.msg : "添加失败");
  }
  getServices()
  insert_dialogVisible.value = false;
};

const clearInsert = async () => {
  insertService.value.name = "";
  insertService.value.department = "";
  insertService.value.details = "";
};

const clearUpdate = async () => {
  updateService.value.name = "";
  updateService.value.department = "";
  updateService.value.details = "";
  updateService.value.id = "";
};

const showUpdateDialog = async(row) => {
  updateService.value.name = row.name;
  updateService.value.department = row.department;
  updateService.value.details = row.details;
  updateService.value.id = row.id;
  serviceView.value.name = row.name;
  serviceView.value.department = row.department;
  serviceView.value.details = row.details;
  serviceView.value.id = row.id;
  update_dialogVisible.value = true;
}

const confirmUpdate = async () => {
  let result = await updateOrModifyService(updateService.value);
  if (result.data.status == 200) {
    alert("修改成功");
  } else {
    alert(result.data.msg ? result.data.msg : "修改失败")
  }
  getServices()
  update_dialogVisible.value = false;
}

const showDetails = async (row) => {
  serviceView.value.details = row.details;
  view_dialogVisible.value = true;
};

const getServices = async () => {
  let result = await getServiceList();
  if (result.data.status == 200) {
    serviceList.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "请求失败");
  }
};
getServices();

const getServicesByName = async () => {
  if (input_search_name.value === "") {
    getServices();
    return;
  }
  let result = await getServiceListByName(input_search_name.value);
  if (result.data.status == 200) {
    serviceList.value = result.data.data;
  } else {
    alert(result.data.msg ? result.data.msg : "请求失败");
  }
};

const confirmDelete = async(row) => {
  let result = await deleteService(row.id)
  if (result.data.status == 200) {
    alert("删除成功")
  } else {
    alert(result.data.msg ? result.data.msg : "删除失败")
  }
  getServices();
}

</script>