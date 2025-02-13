const getMicroAppsFromEnv = () => {
  const names = import.meta.env.VITE_APP_SUB_APP_NAMES?.split(",") || [];
  const urls = import.meta.env.VITE_APP_SUB_APP_URLS?.split(",") || [];

  return names.reduce((acc, name, index) => {
    if (name && urls[index]) {
      acc[name] = urls[index];
    }
    return acc;
  }, {});
};

/**
 * microApps: {
 *   [name]: [url],
 *   map: http://map.chengyuming.cn,
 *   topPicks: http://nav.chengyuming.cn
 * }
 */
const microApps = getMicroAppsFromEnv();

const microAppsList = Object.keys(microApps).map(key => ({
  name: key,
  url: microApps[key],
  default: true,
}));

const MICRO_APPS_KEY = "MICRO_APPS";

setMicroAppsConf(microAppsList);

export function setMicroAppsConf(appList = []) {
  sessionStorage.setItem(MICRO_APPS_KEY, JSON.stringify(appList));
}
export function getMicroAppsConf() {
  return JSON.parse(sessionStorage.getItem(MICRO_APPS_KEY) || "[]");
}

export function getMicroAppsMap() {
  const list = getMicroAppsConf();
  return list.reduce((acc, item) => {
    acc[item.name] = item.url;
    return acc;
  }, {});
}

export function isMicroAppRoute(route) {
  return Object.keys(microApps).some(prefix => route.path.startsWith(`/${prefix}`));
}
