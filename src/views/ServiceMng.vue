<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 搜索框中的服务名称数据模型
const input_search_name = ref("");

// 新增服务的弹出窗控制数据模型
const insert_dialogVisible = ref(false);
const input_insert_name = ref("");
const input_insert_department = ref("");
const input_insert_details = ref("");

// 查看服务的数据模型
const view_dialogVisible = ref(false);

// 删除服务的数据模型

// 编辑服务的数据模型
const update_dialogVisible = ref(false);
const input_update_name = ref("");
const input_update_department = ref("");
const input_update_details = ref("");

const confirmInsert = async () => {
  insert_dialogVisible.value = false;
};

const clearInsert = async () => {
  input_insert_name.value = "";
  input_insert_department.value = "";
  input_insert_details.value = "";
};

const clearUpdate = async () => {
  input_update_name.value = "";
  input_update_department.value = "";
  input_update_details.value = "";
};

const confirmUpdate = async () => {
  update_dialogVisible.value = false;
};

const tableData = [
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
  {
    id: "300",
    name: "境外组织或者个人在中华人民共和国境内进行非物质文化遗产调查的审批",
    department: "中华人民共和国文化和旅游部",
  },
];
</script>

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
            ><el-button><search /></el-button
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
          <el-table :data="tableData" class="service-table" height="480">
            <el-table-column fixed prop="id" label="编号" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="department" label="部门" />
            <el-table-column fixed="right" label="操作" width="160">
              <template #default>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="view_dialogVisible = true"
                >
                  <el-icon size="20"><View /></el-icon>
                </el-button>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="update_dialogVisible = true"
                >
                  <el-icon size="20"><Edit /></el-icon>
                </el-button>

                <el-popconfirm title="确定删除？请慎重考虑">
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
      <el-dialog
        v-model="insert_dialogVisible"
        title="新增服务"
        width="500"
		style="border-radius: 10px;"
        :before-close="handleClose"
      >
        <div>
          <div class="insert-dialog-text">名称：</div>
          <el-input
            v-model="input_insert_name"
            placeholder="请输入服务名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">部门：</div>
          <el-input
            v-model="input_insert_department"
            placeholder="请输入部门名称"
            clearable
          />
        </div>
        <div>
          <div class="insert-dialog-text">详情：</div>
          <el-input
            v-model="input_insert_details"
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

      <el-dialog
        v-model="view_dialogVisible"
        title="详情内容"
        width="500"
		style="border-radius: 10px;"
        :before-close="handleClose"
      >
        <div>
          <el-descriptions>
            <el-descriptions-item>暂无详细信息</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-dialog>

      <el-dialog
        v-model="update_dialogVisible"
        title="编辑服务"
        width="800"
		style="border-radius: 10px;"
        :before-close="handleClose"
      >
        <div>
			<div class="insert-dialog-text">原名称：</div>
			<div></div>
          <div class="insert-dialog-text">新名称：</div>
          <el-input
            v-model="update_insert_name"
            placeholder="请输入更改后的服务名称"
            clearable
          />
        </div>
        <div>
			<div class="insert-dialog-text">原部门：</div>
          <div class="insert-dialog-text">部门：</div>
          <el-input
            v-model="update_insert_department"
            placeholder="请输入更改后的部门名称"
            clearable
          />
        </div>
        <div>
			<div class="insert-dialog-text">原详情内容</div>
          <div class="insert-dialog-text">新详情：</div>
          <el-input
            v-model="update_insert_details"
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