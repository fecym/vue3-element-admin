<template>
  <micro-app
    v-if="curMicroApp"
    :name="curMicroApp.appName"
    :url="curMicroApp.fullUrl"
    iframe
    :baseroute="`/${curMicroApp.appName}`"
    @datachange="onDataChange"
  />
</template>

<script setup>
import { useRoute } from "vue-router";
import { getMicroAppsMap } from "@/utils/microApp.js";
const route = useRoute();

const microApps = getMicroAppsMap();

function getCurMicroApp() {
  const appName = route.meta.microAppName;
  if (!appName) return;
  const url = microApps[appName];
  const { params } = route.params;
  const toPath = params ? "/" + params.join("/") : "/";
  return { appName, url, toPath, fullUrl: url + toPath };
}

const curMicroApp = getCurMicroApp();
console.log(curMicroApp, "curMicroApp");

function onDataChange(e) {
  console.log("datachange", e);
}
</script>

<style scoped lang="scss"></style>
