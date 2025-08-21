<template>
  <el-dialog
    v-model="dialogVisible"
    custom-class="tcm-dialog has-bottom-line"
    title="绑定邮箱"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱">
          <template #append>
            <el-button :disabled="!!emailCountdown" @click="handleSendEmailCode">
              {{ emailCountdown ? `${emailCountdown}秒后重新获取` : "获取验证码" }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码" maxlength="6" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import UserAPI from "@/api/user.js";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "success"]);

const dialogVisible = ref(false);
const formRef = ref();
const form = ref({
  email: "",
  code: "",
});

const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const emailCountdown = ref(0);
const emailTimer = ref(null);

watch(
  () => props.modelValue,
  val => {
    dialogVisible.value = val;
  }
);

watch(
  () => dialogVisible.value,
  val => {
    emit("update:modelValue", val);
    if (!val) {
      clearInterval(emailTimer.value);
      emailCountdown.value = 0;
    }
  }
);

const handleClose = () => {
  dialogVisible.value = false;
  formRef.value?.resetFields();
};

const handleSendEmailCode = async () => {
  try {
    await formRef.value?.validateField("email");
    await UserAPI.sendEmailCode(form.value.email);
    ElMessage.success("验证码发送成功");
    emailCountdown.value = 60;
    emailTimer.value = setInterval(() => {
      if (emailCountdown.value > 0) {
        emailCountdown.value--;
      } else {
        clearInterval(emailTimer.value);
      }
    }, 1000);
  } catch (error) {
    // 验证失败
  }
};

const handleSubmit = async () => {
  await formRef.value?.validate();
  await UserAPI.bindOrChangeEmail(form.value);
  ElMessage.success("邮箱绑定成功");
  emit("success");
  handleClose();
};
</script>
