<template>
  <div class="box-search">
    <slot />
  </div>
</template>
<script setup></script>

<style lang="scss">
.box-search {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 52px;
  padding: 20px;

  .el-button + .el-button {
    margin: 0;
  }

  .el-input,
  .el-select {
    flex-shrink: 0;
    width: 200px;
  }

  .el-date-editor.el-input__wrapper {
    flex-grow: 0;
  }

  .el-button {
    flex-shrink: 0;

    &:hover {
      box-shadow: 0 2px 6px rgb(64 158 255 / 30%);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}
</style>
