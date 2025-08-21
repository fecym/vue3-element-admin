<template>
  <el-dialog
    v-model="dialogVisible"
    custom-class="tcm-dialog has-bottom-line"
    title="绑定手机"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" maxlength="11">
          <template #append>
            <el-button :disabled="!!mobileCountdown" @click="handleSendMobileCode">
              {{ mobileCountdown ? `${mobileCountdown}秒后重新获取` : "获取验证码" }}
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
  mobile: "",
  code: "",
});

const rules = {
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

const mobileCountdown = ref(0);
const mobileTimer = ref(null);

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
      clearInterval(mobileTimer.value);
      mobileCountdown.value = 0;
    }
  }
);

const handleClose = () => {
  dialogVisible.value = false;
  formRef.value?.resetFields();
};

const handleSendMobileCode = async () => {
  try {
    await formRef.value?.validateField("mobile");
    await UserAPI.sendMobileCode(form.value.mobile);
    ElMessage.success("验证码发送成功");
    mobileCountdown.value = 60;
    mobileTimer.value = setInterval(() => {
      if (mobileCountdown.value > 0) {
        mobileCountdown.value--;
      } else {
        clearInterval(mobileTimer.value);
      }
    }, 1000);
  } catch (error) {
    // 验证失败
  }
};

const handleSubmit = async () => {
  await formRef.value?.validate();
  await UserAPI.bindOrChangeMobile(form.value);
  ElMessage.success("手机绑定成功");
  emit("success");
  handleClose();
};
</script>
