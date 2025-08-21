import menuMock from "@/mock/menu.js";
import user from "@/utils/user.js";

// 递归过滤菜单项
function filterMenuByRole(menus, userRole) {
  return menus.filter(menu => {
    // 检查当前菜单项是否包含用户角色
    if (!menu.roles || !menu.roles.includes(userRole)) {
      return false;
    }

    // 如果有子菜单，递归过滤子菜单
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenuByRole(menu.children, userRole);
    }

    return true;
  });
}

export function getRoutes() {
  const role = user.getUserInfo().role;
  const allMenus = menuMock["menus/routes"];

  // 根据角色过滤菜单
  const filteredMenus = filterMenuByRole(allMenus, role);

  return Promise.resolve(filteredMenus);
}
