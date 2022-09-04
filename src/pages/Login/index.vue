<template>
  <div class="login">
    <div class="left-page"></div>
    <div class="right-page">
      <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" :name="0"></el-tab-pane>
        <el-tab-pane label="注册" :name="1"></el-tab-pane>
      </el-tabs>

      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Create</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import type { FormRules, FormInstance } from 'element-plus';
import { signin, signup } from '@/api';

const router = useRouter();
const store = useStore();

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({ phone: '', password: '' });
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (activeTab.value === 0) {
        signin({ ...ruleForm }).then((res) => {
          store.dispatch('LOGIN', res.data.id);
          router.push('/');
        });
      } else {
        signup({ ...ruleForm });
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

const activeTab = ref(0);
const handleClick = () => {
  activeTab.value = activeTab.value++ % 2;
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100%;
  .left-page {
    flex: 2;
    background: url('https://t7.baidu.com/it/u=1092574912,855301095&fm=193&f=GIF');
    background-size: cover;
    background-position: center center;
  }
  .right-page {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
