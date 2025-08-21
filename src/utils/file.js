import * as XLSX from "xlsx";

/**
 * 可以下载的URL包括base64
 * @param url
 * @param downloadName 可以不加后缀名
 * @param cb 下载完之后的回调函数
 */
export const downloadByUrl = (url, downloadName = "", cb) => {
  const eleLink = document.createElement("a");
  eleLink.setAttribute("download", downloadName);
  eleLink.setAttribute("href", url);
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
  cb && cb();
};

/**
 * 打印dom
 * @param dom
 * @param isCenter
 */
export const printPageByDom = (dom = null, isCenter = true) => {
  if (!dom) return;
  const printFrameId = "print-frame";
  let printFrame = document.getElementById(printFrameId);
  if (printFrame) {
    document.body.removeChild(printFrame);
  }
  printFrame = document.createElement("iframe");
  printFrame.name = printFrameId;
  printFrame.setAttribute("id", printFrameId);
  printFrame.setAttribute("width", "100%");
  printFrame.setAttribute("height", "100%");
  printFrame.setAttribute("style", "position:absolute;width:0px;height:0px");
  if (isCenter) {
    const parentEl = document.createElement("div");
    parentEl.style.textAlign = "center";
    // parentEl.style.height = "100vh";
    parentEl.style.display = "flex";
    parentEl.style.alignItems = "center";
    parentEl.style.justifyContent = "center";
    parentEl.innerHTML = dom.outerHTML;
    printFrame.srcdoc = parentEl.outerHTML;
  } else {
    printFrame.srcdoc = dom.outerHTML;
  }
  document.body.appendChild(printFrame);
  printFrame.contentWindow.focus();
  printFrame.contentWindow.print();
};

/**
 * base64 转文件预览地址，慎用！用得多了可能早晨内存泄漏
 * @param base64
 * @param contentType 类型
 * @param includeHead 是否包含base64头
 * @returns {string}
 */
export function base64ToUrl(base64, contentType = "image/png", includeHead = false) {
  if (includeHead) {
    // 如果包含 base64 头，要去掉
    base64 = base64.split(",")[1];
  }
  const bstr = window.atob(base64);
  let len = bstr.length;
  const uint8Arr = new Uint8Array(len);
  while (len--) {
    // 返回指定位置的字符的 Unicode 编码
    uint8Arr[len] = bstr.charCodeAt(len);
  }
  const blob = new Blob([uint8Arr], { type: contentType });
  return URL.createObjectURL(blob);
}

/**
 * 导出Excel文件
 * @param {Array<Object>} data 要导出的数据（JSON对象数组）
 * @param {Object} headerMap 字段与表头名称的映射（例如：{ name: '姓名', age: '年龄', city: '城市' }）
 * @param {string} filename 导出的文件名
 * @param {Object} columnWidths 列宽设置（例如：{ 姓名: 15, 年龄: 10, 城市: 20 }）
 */
export function exportExcel(data, headerMap = {}, filename = "导出文件.xlsx", columnWidths = {}) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("导出数据不能为空且必须是数组类型");
    return;
  }

  const headers = Object.keys(headerMap);
  const formattedData = data.map(item => {
    const formattedItem = {};
    headers.forEach(key => {
      formattedItem[headerMap[key]] = item[key];
    });
    return formattedItem;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData, { header: Object.values(headerMap) });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 设置列宽
  worksheet["!cols"] = headers.map(header => ({
    wpx: columnWidths[headerMap[header]] || 100, // 设置默认宽度为10，如果未指定
  }));

  // 生成 Excel 文件并下载
  XLSX.writeFile(workbook, filename);
}
