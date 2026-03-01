<template>
  <div class="page-container">
    <div class="page-header">
      <h2>公司信息</h2>
    </div>

    <el-card v-loading="loading">
      <el-form ref="formRef" :model="form" label-width="100px" style="max-width: 700px;">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form.name_en" />
        </el-form-item>
        <el-form-item label="公司简介">
          <el-input v-model="form.description" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="Logo">
          <div class="upload-area">
            <el-upload :show-file-list="false" :http-request="handleUploadLogo" accept="image/*">
              <el-image v-if="form.logo" :src="form.logo" style="width: 160px; height: 60px;" fit="contain" />
              <div v-else class="upload-placeholder">
                <el-icon size="20"><Plus /></el-icon>
                <span>上传 Logo</span>
              </div>
            </el-upload>
            <el-input v-model="form.logo" placeholder="或输入 Logo URL" size="small" style="margin-top: 6px;" />
          </div>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="成立年份">
          <el-input v-model="form.founded_year" style="width: 140px;" />
        </el-form-item>
        <el-form-item label="员工人数">
          <el-input v-model="form.employee_count" style="width: 140px;" />
        </el-form-item>
        <el-form-item label="工厂面积">
          <el-input v-model="form.factory_area" placeholder="如：20000平方米" />
        </el-form-item>
        <el-form-item label="微信二维码">
          <div class="upload-area">
            <el-upload :show-file-list="false" :http-request="handleUploadQrcode" accept="image/*">
              <el-image v-if="form.wechat_qrcode" :src="form.wechat_qrcode" style="width: 120px; height: 120px;" fit="contain" />
              <div v-else class="upload-placeholder small">
                <el-icon size="20"><Plus /></el-icon>
                <span>上传二维码</span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="ICP备案号">
          <el-input v-model="form.icp_number" placeholder="如：鲁ICP备XXXXXXXXXX号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSave">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { companyApi, uploadApi } from '@/api'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const submitting = ref(false)
const formRef = ref()

const form = reactive({
  name: '', name_en: '', description: '', logo: '',
  phone: '', email: '', address: '',
  founded_year: '', employee_count: '', factory_area: '',
  wechat_qrcode: '', icp_number: ''
})

const fetchCompany = async () => {
  loading.value = true
  try {
    const res = await companyApi.get()
    if (res.data) Object.assign(form, res.data)
  } catch { /* 已处理 */ } finally {
    loading.value = false
  }
}

const handleUploadLogo = async ({ file }) => {
  try {
    const res = await uploadApi.image(file, 'company')
    form.logo = res.data?.url || res.data?.path
    ElMessage.success('Logo 上传成功')
  } catch {
    ElMessage.error('上传失败')
  }
}

const handleUploadQrcode = async ({ file }) => {
  try {
    const res = await uploadApi.image(file, 'company')
    form.wechat_qrcode = res.data?.url || res.data?.path
    ElMessage.success('二维码上传成功')
  } catch {
    ElMessage.error('上传失败')
  }
}

const handleSave = async () => {
  submitting.value = true
  try {
    await companyApi.update(form)
    ElMessage.success('保存成功')
  } catch { /* 已处理 */ } finally {
    submitting.value = false
  }
}

onMounted(fetchCompany)
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 16px;
    h2 { font-size: 18px; color: #303133; }
  }

  .upload-area {
    .upload-placeholder, .upload-placeholder.small {
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
    .upload-placeholder { width: 160px; height: 60px; }
    .upload-placeholder.small { width: 120px; height: 120px; }
  }
}
</style>
