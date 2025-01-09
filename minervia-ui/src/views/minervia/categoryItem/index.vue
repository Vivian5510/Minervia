<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" v-show="showSearch" :inline="true" label-width="68px">
      <el-form-item label="细则名称" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入科目细则名称"
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
            v-hasPermi="['minervia:categoryItem:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 表格数据 -->
    <el-table v-loading="loading" :data="categoryItemItemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="CategoryItem编号" prop="id" width="120" />
      <el-table-column label="CategoryItem名称" prop="text" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="CategoryItem值" prop="value" :show-overflow-tooltip="true" width="400" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['minervia:categoryItem:edit']"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['minervia:categoryItem:remove']"></el-button>
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
      <el-form ref="categoryItemRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="CategoryItem名称" prop="text">
          <el-input v-model="form.title" placeholder="请输入CategoryItem标题" />
        </el-form-item>
        <el-form-item label="CategoryItem值" prop="value">
          <el-input v-model="form.url" placeholder="请输入CategoryItem值" />
        </el-form-item>
        <el-form-item label="CategoryItem顺序" prop="orderNum">
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

<script setup name="CategoryItem">
import {listCategoryItem, addCategoryItem, updateCategoryItem, delCategoryItem, getCategoryItem} from "@/api/minervia/categoryItem.js";

const { proxy } = getCurrentInstance();

const categoryItemItemList = ref([]);
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
    text: undefined,
    value: undefined
  },
  rules: {
    text: [{ required: true, message: "CategoryItemItem名称不能为空", trigger: "blur" }],
    value: [{ required: true, message: "CategoryItem值不能为空", trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listCategoryItem(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    categoryItemItemList.value = response.rows;
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
  proxy.$modal.confirm('是否确认删除CategoryItem编号为"' + ids + '"的数据项?').then(function () {
    return delCategoryItem(ids);
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
    text: undefined,
    value: undefined,
    orderNum: 0
  };
  proxy.resetForm("categoryItemRef");
}

/** 添加CategoryItem */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加CategoryItem";
}

/** 修改CategoryItem */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value;
  getCategoryItem(id).then(response => {
    form.value = response.data;
    form.value.orderNum = Number(form.value.orderNum);
    open.value = true;
  });
  title.value = "修改CategoryItem";
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["categoryItemRef"].validate(valid => {
    if (valid) {
      if (form.value.id !== undefined) {
        updateCategoryItem(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addCategoryItem(form.value).then(response => {
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
