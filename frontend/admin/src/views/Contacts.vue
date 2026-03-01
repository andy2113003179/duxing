<template>
  <div class="page-container">
    <div class="page-header">
      <h2>联系方式管理</h2>
      <el-button type="primary" icon="Plus" @click="openDialog()">添加联系方式</el-button>
    </div>

    <el-card>
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column label="类型" prop="type" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ typeMap[row.type] || row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="label" width="120" />
        <el-table-column label="内容" prop="value" min-width="250" show-overflow-tooltip />
        <el-table-column label="图标" prop="icon" width="100" />
        <el-table-column label="排序" prop="sort_order" width="70" align="center" />
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.is_public !== false ? 'success' : 'info'" size="small">
              {{ row.is_public !== false ? '公开' : '隐藏' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" link icon="Edit" @click="openDialog(row)">编辑</el-button>
            <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button type="danger" link icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          @change="fetchList"
        />
      </div>
    </el-card>

    <!-- 新增 / 编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑联系方式' : '添加联系方式'" width="500px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="选择类型">
            <el-option label="电话" value="phone" />
            <el-option label="手机" value="mobile" />
            <el-option label="邮箱" value="email" />
            <el-option label="传真" value="fax" />
            <el-option label="微信" value="wechat" />
            <el-option label="QQ" value="qq" />
            <el-option label="地址" value="address" />
            <el-option label="网站" value="website" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="label">
          <el-input v-model="form.label" placeholder="如：销售热线、总部地址" />
        </el-form-item>
        <el-form-item label="内容" prop="value">
          <el-input v-model="form.value" placeholder="联系方式内容" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="Element Plus 图标名" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort_order" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公开">
              <el-switch v-model="form.is_public" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { contactApi } from '@/api'
import { ElMessage } from 'element-plus'

const typeMap = {
  phone: '电话', mobile: '手机', email: '邮箱', fax: '传真',
  wechat: '微信', qq: 'QQ', address: '地址', website: '网站', other: '其他'
}

const loading = ref(false)
const submitting = ref(false)
const list = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)
const formRef = ref()

const defaultForm = () => ({
  type: 'phone', label: '', value: '', icon: '',
  sort_order: 0, is_public: true
})
const form = reactive(defaultForm())

const rules = {
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  label: [{ required: true, message: '请输入标签', trigger: 'blur' }],
  value: [{ required: true, message: '请输入内容', trigger: 'blur' }],
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await contactApi.list({ page: page.value, limit: pageSize.value })
    list.value = res.data
    total.value = res.data?.pagination?.total || 0
  } catch { /* 已处理 */ } finally {
    loading.value = false
  }
}

const openDialog = (row) => {
  isEdit.value = !!row
  editId.value = row?.id || null
  Object.assign(form, row ? { ...row } : defaultForm())
  dialogVisible.value = true
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEdit.value) {
      await contactApi.update(editId.value, form)
      ElMessage.success('更新成功')
    } else {
      await contactApi.create(form)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchList()
  } catch { /* 已处理 */ } finally {
    submitting.value = false
  }
}

const handleDelete = async (id) => {
  try {
    await contactApi.delete(id)
    ElMessage.success('删除成功')
    fetchList()
  } catch { /* 已处理 */ }
}

onMounted(fetchList)
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    h2 { font-size: 18px; color: #303133; }
  }

  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
}
</style>
