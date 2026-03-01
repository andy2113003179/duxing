<template>
  <div class="page-container">
    <div class="page-header">
      <h2>轮播图管理</h2>
      <el-button type="primary" icon="Plus" @click="openDialog()">添加轮播图</el-button>
    </div>

    <!-- 列表 -->
    <el-card>
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column label="排序" prop="sort_order" width="70" align="center" />
        <el-table-column label="预览图" width="200">
          <template #default="{ row }">
            <el-image :src="row.image" :preview-src-list="[row.image]" style="width: 160px; height: 80px;" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" min-width="150" show-overflow-tooltip />
        <el-table-column label="描述" prop="description" min-width="200" show-overflow-tooltip />
        <el-table-column label="链接" prop="link" min-width="150" show-overflow-tooltip />
        <el-table-column label="位置" prop="position" width="100">
          <template #default="{ row }">
            <el-tag size="small">{{ row.position === 'home' ? '首页' : row.position }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'" size="small">
              {{ row.status === 'active' ? '启用' : '禁用' }}
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑轮播图' : '添加轮播图'" width="600px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="2" placeholder="描述文字" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <div class="upload-area">
            <el-upload
              :show-file-list="false"
              :http-request="handleUpload"
              accept="image/*"
            >
              <el-image v-if="form.image" :src="form.image" style="width: 240px; height: 120px;" fit="cover" />
              <div v-else class="upload-placeholder">
                <el-icon size="24"><Plus /></el-icon>
                <span>点击上传图片</span>
              </div>
            </el-upload>
            <el-input v-model="form.image" placeholder="或直接输入图片URL" size="small" style="margin-top: 8px;" />
          </div>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" placeholder="可选跳转链接" />
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort_order" :min="0" :max="999" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="位置">
              <el-select v-model="form.position">
                <el-option label="首页" value="home" />
                <el-option label="产品页" value="product" />
                <el-option label="关于页" value="about" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select v-model="form.status">
                <el-option label="启用" value="active" />
                <el-option label="禁用" value="inactive" />
              </el-select>
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
import { bannerApi, uploadApi } from '@/api'
import { ElMessage } from 'element-plus'

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
  title: '', description: '', image: '', link: '',
  sort_order: 0, position: 'home', status: 'active'
})
const form = reactive(defaultForm())

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  image: [{ required: true, message: '请上传或输入图片地址', trigger: 'blur' }],
}

const fetchList = async () => {
  loading.value = true
  try {
    const res = await bannerApi.list({ page: page.value, limit: pageSize.value })
    list.value = res.data?.banners || res.data?.rows || []
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

const handleUpload = async ({ file }) => {
  try {
    const res = await uploadApi.image(file, 'banners')
    form.image = res.data?.url || res.data?.path
    ElMessage.success('图片上传成功')
  } catch {
    ElMessage.error('图片上传失败')
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    if (isEdit.value) {
      await bannerApi.update(editId.value, form)
      ElMessage.success('更新成功')
    } else {
      await bannerApi.create(form)
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
    await bannerApi.delete(id)
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

  .upload-area {
    .upload-placeholder {
      width: 240px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      color: #909399;
      cursor: pointer;

      &:hover { border-color: #409eff; color: #409eff; }
    }
  }
}
</style>
