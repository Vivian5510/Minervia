<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
      <el-form-item label="科目名称" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入科目名称"
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
            v-hasPermi="['minervia:category:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Category编号" prop="id" width="120" />
      <el-table-column label="Category名称" prop="text" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="Category值" prop="name" :show-overflow-tooltip="true" width="400" />
      <el-table-column label="Category图标" prop="src" width="350">
        <template #default="scope">
          <img :src="scope.row.src" style="width: 90px; height: 60px;" alt=""/>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['minervia:category:edit']"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['minervia:category:remove']"></el-button>
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
      <el-form ref="categoryRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Category名称" prop="text">
          <el-input v-model="form.title" placeholder="请输入Category标题" />
        </el-form-item>
        <el-form-item label="Category值" prop="name">
          <el-input v-model="form.name" placeholder="请输入Category值" />
        </el-form-item>
        <el-form-item label="Category顺序" prop="orderNum">
          <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="Category图标" prop="src">
          <el-upload
              action="/dev-api/file/upload"
              :limit="1"
              :on-success="uploadSuccess"
              :headers="headers">
            <el-button type="primary">上传图标</el-button>
          </el-upload>
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

<script setup name="Category">
import {listCategory, addCategory, updateCategory, delCategory, getCategory} from "@/api/minervia/category.js";
import {getToken} from "@/utils/auth.js";

const { proxy } = getCurrentInstance();

const categoryList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const dateRange = ref([]);
const headers = ref({
  'Authorization': 'Bearer ' + getToken()
});



const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    url: undefined,
    src: undefined,
  },
  rules: {
    text: [{ required: true, message: "Category名称不能为空", trigger: "blur" }],
    name: [{ required: true, message: "Category值不能为空", trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

function uploadSuccess(res) {
  console.log(res);
  form.value.src = res.msg;
}

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listCategory(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    categoryList.value = response.rows;
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
  proxy.$modal.confirm('是否确认删除Category编号为"' + ids + '"的数据项?').then(function () {
    return delCategory(ids);
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
    orderNum: 0,
    src: undefined
  };
  proxy.resetForm("categoryRef");
}

/** 添加Category */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加Category";
}

/** 修改Category */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value;
  getCategory(id).then(response => {
    form.value = response.data;
    form.value.orderNum = Number(form.value.orderNum);
    open.value = true;
  });
  title.value = "修改Category";
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["categoryRef"].validate(valid => {
    if (valid) {
      if (form.value.id !== undefined) {
        updateCategory(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addCategory(form.value).then(response => {
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
