<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
      <el-form-item label="模型名称" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入模型名称"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['minervia:model:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="modelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Model编号" prop="id" width="120" />
      <el-table-column label="Model名称" prop="name" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="是否收费" prop="charge" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="是否支持多轮对话" prop="multiple" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="调用地址" prop="url" :show-overflow-tooltip="true" width="400" />
      <el-table-column label="提问提示词" prop="questionPrompt" :show-overflow-tooltip="true" width="300" />
      <el-table-column label="回答提示词" prop="answerPrompt" :show-overflow-tooltip="true" width="300" />
      <el-table-column label="角色提示词" prop="role" :show-overflow-tooltip="true" width="300" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['minervia:model:edit']"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['minervia:model:remove']"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form ref="modelRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Model名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入Model名称" />
        </el-form-item>
        <el-form-item label="Model调用地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入Model调用地址" />
        </el-form-item>
        <el-form-item label="是否收费" prop="charge">
          <el-input v-model="form.charge" placeholder="请输入Model是否收费 0 否 1 是" />
        </el-form-item>
        <el-form-item label="是否支持多轮对话" prop="multiple">
          <el-input v-model="form.multiple" placeholder="请输入Model是否支持多轮对话 0 否 1 是" />
        </el-form-item>
        <el-form-item label="提问提示词" prop="questionPrompt">
          <el-input v-model="form.questionPrompt" placeholder="请输入Model提问提示词" />
        </el-form-item>
        <el-form-item label="回答提示词" prop="answerPrompt">
          <el-input v-model="form.answerPrompt" placeholder="请输入Model回答提示词" />
        </el-form-item>
        <el-form-item label="角色提示词" prop="role">
          <el-input v-model="form.role" placeholder="请输入Model角色提示词" />
        </el-form-item>
        <el-form-item label="顺序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Model">
import {listModel, addModel, updateModel, delModel, getModel} from "@/api/minervia/model.js";
import {getToken} from "@/utils/auth.js";

const { proxy } = getCurrentInstance();

const modelList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);


const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    url: undefined,
    charge: undefined,
    multiple: undefined,
    questionPrompt: undefined,
    answerPrompt: undefined,
    role: undefined,
    orderNum: undefined
  },
  rules: {
    text: [{ required: true, message: "Model名称不能为空", trigger: "blur" }],
    name: [{ required: true, message: "Model值不能为空", trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listModel(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    modelList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 删除按钮操作 */
function handleDelete(row) {
  const ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除Model编号为"' + ids + '"的数据项?').then(function () {
    return delModel(ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 重置新增的表单以及其他数据  */
function reset() {
  form.value = {
    id: undefined,
    name: undefined,
    url: undefined,
    charge: undefined,
    multiple: undefined,
    questionPrompt: undefined,
    answerPrompt: undefined,
    role: undefined,
    orderNum: 0,
  };
  proxy.resetForm("modelRef");
}

/** 添加Model */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加Model";
}

/** 修改Model */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value;
  getModel(id).then(response => {
    form.value = response.data;
    form.value.orderNum = Number(form.value.orderNum);
    open.value = true;
  });
  title.value = "修改Model";
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["modelRef"].validate(valid => {
    if (valid) {
      if (form.value.id !== undefined) {
        updateModel(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addModel(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

getList();
</script>
