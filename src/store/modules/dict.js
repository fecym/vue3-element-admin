import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { store } from "@/store";
import DictionaryAPI from "@/api/system/dict";

export const useDictStore = defineStore("dict", () => {
  const dictionary = useStorage("dictionary", {});

  /**
   * 设置字典数据
   * @param {object} dict 字典数据
   */
  const setDictionary = dict => {
    dictionary.value[dict.dictCode] = dict.dictDataList;
  };

  /**
   * 加载字典数据
   */
  const loadDictionaries = async () => {
    const dictList = await DictionaryAPI.getList();
    dictList.forEach(setDictionary);
  };

  /**
   * 获取字典数据
   * @param {string} dictCode 字典编码
   * @returns {Array} 字典数据列表
   */
  const getDictionary = dictCode => {
    return dictionary.value[dictCode] || [];
  };

  /**
   * 清除字典缓存
   */
  const clearDictionaryCache = () => {
    dictionary.value = {};
  };

  /**
   * 更新字典缓存
   */
  const updateDictionaryCache = async () => {
    clearDictionaryCache(); // 先清除旧缓存
    await loadDictionaries(); // 重新加载最新字典数据
  };

  return {
    dictionary,
    setDictionary,
    loadDictionaries,
    getDictionary,
    clearDictionaryCache,
    updateDictionaryCache,
  };
});

export function useDictStoreHook() {
  return useDictStore(store);
}
