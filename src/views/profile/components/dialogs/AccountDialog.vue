<template>
  <el-dialog v-model="dialogVisible" title="账号资料" width="500px" @close="handleClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <Dict v-model="form.gender" code="gender" />
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
import UserAPI from "@/api/system/user";
import { ElMessage } from "element-plus";
import Dict from "@/components/Dict/index.vue";
const props = defineProps({
  modelValue: Boolean,
  userInfo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "success"]);

const dialogVisible = ref(false);
const formRef = ref();
const form = ref({
  nickname: "",
  gender: undefined,
});

const rules = {
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
};

watch(
  () => props.modelValue,
  val => {
    dialogVisible.value = val;
    if (val) {
      form.value = {
        nickname: props.userInfo.nickname,
        gender: props.userInfo.gender,
      };
    }
  }
);

watch(
  () => dialogVisible.value,
  val => {
    emit("update:modelValue", val);
  }
);

const handleClose = () => {
  dialogVisible.value = false;
  formRef.value?.resetFields();
};

const handleSubmit = async () => {
  await formRef.value?.validate();
  await UserAPI.updateProfile(form.value);
  ElMessage.success("修改成功");
  emit("success");
  handleClose();
};
</script>
