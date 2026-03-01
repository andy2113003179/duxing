<template>
  <div class="page-container">
    <div class="page-header">
      <h2>产品管理</h2>
      <el-button type="primary" icon="Plus" @click="openDialog()">添加产品</el-button>
    </div>

    <!-- 搜索栏 -->
    <el-card class="search-bar">
      <el-form inline>
        <el-form-item label="关键词">
          <el-input v-model="searchName" placeholder="搜索产品名称" clearable @clear="fetchList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="fetchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 列表 -->
    <el-card>
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column label="主图" width="100">
          <template #default="{ row }">
            <el-image :src="getMainImage(row)" style="width: 60px; height: 60px;" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column label="产品名称" prop="name" min-width="150" show-overflow-tooltip />
        <el-table-column label="分类" width="120">
          <template #default="{ row }">
            <el-tag size="small">{{ row.category?.name || row.category_id || '-' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="简介" prop="summary" min-width="200" show-overflow-tooltip />
        <el-table-column label="排序" prop="sort_order" width="70" align="center" />
        <el-table-column label="推荐" width="70" align="center">
          <template #default="{ row }">
            <el-tag :type="row.is_featured ? 'warning' : 'info'" size="small">
              {{ row.is_featured ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'published' ? 'success' : 'info'" size="small">
              {{ row.status === 'published' ? '发布' : '草稿' }}
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
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑产品' : '添加产品'" width="720px" destroy-on-close top="5vh">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="产品名称" />
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-input v-model="form.summary" type="textarea" :rows="2" placeholder="一句话简介" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="详细描述" />
        </el-form-item>

        <el-form-item label="主图" prop="cover_image">
          <div class="upload-area">
            <el-upload :show-file-list="false" :http-request="(f) => handleUploadCover(f)" accept="image/*">
              <el-image v-if="form.cover_image" :src="form.cover_image" style="width: 120px; height: 120px;" fit="cover" />
              <div v-else class="upload-placeholder small">
                <el-icon size="20"><Plus /></el-icon>
                <span>上传主图</span>
              </div>
            </el-upload>
            <el-input v-model="form.cover_image" placeholder="或输入图片URL" size="small" style="margin-top: 6px; width: 260px;" />
          </div>
        </el-form-item>

        <el-form-item label="产品图集">
          <el-upload
            :file-list="imageFileList"
            :http-request="handleUploadGallery"
            accept="image/*"
            list-type="picture-card"
            :on-remove="handleRemoveImage"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="分类">
              <el-input v-model="form.category_id" placeholder="分类ID" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序">
              <el-input-number v-model="form.sort_order" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐">
              <el-switch v-model="form.is_featured" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="规格参数">
          <div class="spec-list">
            <div class="spec-item" v-for="(spec, idx) in form.specifications" :key="idx">
              <el-input v-model="spec.name" placeholder="参数名" style="width: 140px;" />
              <el-input v-model="spec.value" placeholder="参数值" style="flex: 1;" />
              <el-button type="danger" icon="Delete" circle size="small" @click="form.specifications.splice(idx, 1)" />
            </div>
            <el-button type="primary" link icon="Plus" @click="form.specifications.push({ name: '', value: '' })">
              添加规格
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品特点">
          <div class="spec-list">
            <div class="spec-item" v-for="(ft, idx) in form.features" :key="idx">
              <el-input v-model="form.features[idx]" placeholder="特点描述" style="flex: 1;" />
              <el-button type="danger" icon="Delete" circle size="small" @click="form.features.splice(idx, 1)" />
            </div>
            <el-button type="primary" link icon="Plus" @click="form.features.push('')">
              添加特点
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="published">发布</el-radio>
            <el-radio value="draft">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { productApi, uploadApi } from '@/api'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const submitting = ref(false)
const list = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchName = ref('')

const dialogVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)
const formRef = ref()
const imageFileList = ref([])

const defaultForm = () => ({
  name: '', summary: '', description: '', cover_image: '',
  images: [], category_id: '', sort_order: 0,
  is_featured: false, status: 'published',
  specifications: [], features: []
})
const form = reactive(defaultForm())

const rules = {
  name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
}

const getMainImage = (row) => {
  return row.cover_image || (row.images && row.images[0]) || ''
}

const fetchList = async () => {
  loading.value = true
  try {
    const params = { page: page.value, limit: pageSize.value }
    if (searchName.value) params.keyword = searchName.value
    const res = await productApi.list(params)
    list.value = res.data?.items || []
    total.value = res.data?.pagination?.total || 0
  } catch { /* 已处理 */ } finally {
    loading.value = false
  }
}

const openDialog = (row) => {
  isEdit.value = !!row
  editId.value = row?.id || null

  if (row) {
    const specs = Array.isArray(row.specifications) ? row.specifications : []
    const feats = Array.isArray(row.features) ? row.features : []
    const imgs = Array.isArray(row.images) ? row.images : []
    Object.assign(form, {
      ...row,
      specifications: specs.map(s => ({ ...s })),
      features: [...feats],
      images: [...imgs],
    })
    imageFileList.value = imgs.map((url, i) => ({ name: `image-${i}`, url }))
  } else {
    Object.assign(form, defaultForm())
    imageFileList.value = []
  }
  dialogVisible.value = true
}

const handleUploadCover = async ({ file }) => {
  try {
    const res = await uploadApi.image(file, 'products')
    form.cover_image = res.data?.url || res.data?.path
    ElMessage.success('主图上传成功')
  } catch {
    ElMessage.error('上传失败')
  }
}

const handleUploadGallery = async ({ file }) => {
  try {
    const res = await uploadApi.image(file, 'products')
    const url = res.data?.url || res.data?.path
    form.images.push(url)
    imageFileList.value.push({ name: file.name, url })
    ElMessage.success('图片上传成功')
  } catch {
    ElMessage.error('上传失败')
  }
}

const handleRemoveImage = (file) => {
  const idx = imageFileList.value.indexOf(file)
  if (idx > -1) {
    imageFileList.value.splice(idx, 1)
    form.images.splice(idx, 1)
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  try {
    const data = {
      ...form,
      specifications: form.specifications.filter(s => s.name),
      features: form.features.filter(f => f),
      category_id: form.category_id ? Number(form.category_id) : null,
    }

    if (isEdit.value) {
      await productApi.update(editId.value, data)
      ElMessage.success('更新成功')
    } else {
      await productApi.create(data)
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
    await productApi.delete(id)
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

  .search-bar { margin-bottom: 16px; }

  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .upload-area {
    .upload-placeholder.small {
      width: 120px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      color: #909399;
      cursor: pointer;
      &:hover { border-color: #409eff; color: #409eff; }
    }
  }

  .spec-list {
    width: 100%;
    .spec-item {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
      align-items: center;
    }
  }
}
</style>
