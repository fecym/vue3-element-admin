export default {
  "menus/routes": [
    {
      id: 0,
      name: "系统管理",
      router: "/system",
      icon: "system",
      children: [
        {
          id: 1,
          name: "用户管理",
          router: "/system/user",
          icon: "el-icon-User",
          children: [],
        },
        {
          id: 2,
          name: "角色管理",
          router: "/system/role",
          icon: "role",
          children: [],
        },
        {
          id: 3,
          name: "菜单管理",
          router: "/system/menu",
          icon: "menu",
          children: [],
        },
        {
          id: 4,
          name: "部门管理",
          router: "/system/dept",
          icon: "tree",
          children: [],
        },
        {
          id: 5,
          name: "字典管理",
          router: "/system/dict",
          icon: "dict",
          children: [],
        },
        {
          id: 6,
          name: "系统日志",
          router: "/system/log",
          icon: "document",
          children: [],
        },
        {
          id: 7,
          name: "字典数据",
          router: "/system/dict-data",
          icon: "",
          children: [],
        },
      ],
    },
    {
      id: 14,
      name: "平台文档",
      router: "/doc",
      icon: "document",
      children: [
        {
          id: 15,
          name: "document",
          router: "/doc/internal-doc",
          icon: "document",
          children: [],
        },
        {
          id: 16,
          name: "平台文档(外链)",
          router: "https://juejin.cn/post/7228990409909108793",
          icon: "link",
          children: [],
        },
      ],
    },
    {
      id: 22,
      name: "组件封装",
      router: "/component",
      icon: "menu",
      children: [
        {
          id: 23,
          name: "增删改查",
          router: "/component/curd",
          icon: "",
          children: [],
        },
        {
          id: 24,
          name: "列表选择器",
          router: "/component/table-select",
          icon: "",
          children: [],
        },
        {
          id: 25,
          name: "富文本编辑器",
          router: "/component/wang-editor",
          icon: "",
          children: [],
        },
        {
          id: 26,
          name: "图片上传",
          router: "/component/upload",
          icon: "",
          children: [],
        },
        {
          id: 27,
          name: "字典组件",
          router: "/component/dict-demo",
          icon: "",
          children: [],
        },
        {
          id: 28,
          name: "图标选择器",
          router: "/component/icon-selector",
          icon: "",
          children: [],
        },
      ],
    },
    {
      id: 32,
      name: "功能演示",
      router: "/function",
      icon: "menu",
      children: [
        {
          id: 33,
          name: "Icons",
          router: "/function/icon-demo",
          icon: "el-icon-Notification",
          children: [],
        },
        {
          id: 34,
          name: "Websocket",
          router: "/function/websocket",
          icon: "",
          children: [],
        },
        {
          id: 35,
          name: "form-demo",
          router: "/demo/form",
          icon: "",
          children: [],
        },
      ],
    },
  ],

  menus: [
    {
      id: 1,
      parentId: 0,
      name: "系统管理",
      type: "CATALOG",
      routeName: "",
      routePath: "/system",
      component: "Layout",
      sort: 1,
      visible: 1,
      icon: "system",
      redirect: "/system/user",
      perm: null,
      children: [
        {
          id: 2,
          parentId: 1,
          name: "用户管理",
          type: "MENU",
          routeName: "User",
          routePath: "user",
          component: "system/user/index",
          sort: 1,
          visible: 1,
          icon: "el-icon-User",
          redirect: null,
          perm: null,
          children: [
            {
              id: 105,
              parentId: 2,
              name: "用户查询",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 0,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:user:query",
              children: [],
            },
            {
              id: 31,
              parentId: 2,
              name: "用户新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: "",
              perm: "sys:user:add",
              children: [],
            },
            {
              id: 32,
              parentId: 2,
              name: "用户编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: "",
              perm: "sys:user:edit",
              children: [],
            },
            {
              id: 33,
              parentId: 2,
              name: "用户删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: "",
              perm: "sys:user:delete",
              children: [],
            },
            {
              id: 88,
              parentId: 2,
              name: "重置密码",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 4,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:user:password:reset",
              children: [],
            },
            {
              id: 106,
              parentId: 2,
              name: "用户导入",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 5,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:user:import",
              children: [],
            },
            {
              id: 107,
              parentId: 2,
              name: "用户导出",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 6,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:user:export",
              children: [],
            },
          ],
        },
        {
          id: 3,
          parentId: 1,
          name: "角色管理",
          type: "MENU",
          routeName: "Role",
          routePath: "role",
          component: "system/role/index",
          sort: 2,
          visible: 1,
          icon: "role",
          redirect: null,
          perm: null,
          children: [
            {
              id: 70,
              parentId: 3,
              name: "角色新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:role:add",
              children: [],
            },
            {
              id: 71,
              parentId: 3,
              name: "角色编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:role:edit",
              children: [],
            },
            {
              id: 72,
              parentId: 3,
              name: "角色删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:role:delete",
              children: [],
            },
          ],
        },
        {
          id: 4,
          parentId: 1,
          name: "菜单管理",
          type: "MENU",
          routeName: "Menu",
          routePath: "menu",
          component: "system/menu/index",
          sort: 3,
          visible: 1,
          icon: "menu",
          redirect: null,
          perm: null,
          children: [
            {
              id: 73,
              parentId: 4,
              name: "菜单新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:menu:add",
              children: [],
            },
            {
              id: 74,
              parentId: 4,
              name: "菜单编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:menu:edit",
              children: [],
            },
            {
              id: 75,
              parentId: 4,
              name: "菜单删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:menu:delete",
              children: [],
            },
          ],
        },
        {
          id: 5,
          parentId: 1,
          name: "部门管理",
          type: "MENU",
          routeName: "Dept",
          routePath: "dept",
          component: "system/dept/index",
          sort: 4,
          visible: 1,
          icon: "tree",
          redirect: null,
          perm: null,
          children: [
            {
              id: 76,
              parentId: 5,
              name: "部门新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dept:add",
              children: [],
            },
            {
              id: 77,
              parentId: 5,
              name: "部门编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dept:edit",
              children: [],
            },
            {
              id: 78,
              parentId: 5,
              name: "部门删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dept:delete",
              children: [],
            },
          ],
        },
        {
          id: 6,
          parentId: 1,
          name: "字典管理",
          type: "MENU",
          routeName: "Dict",
          routePath: "dict",
          component: "system/dict/index",
          sort: 5,
          visible: 1,
          icon: "dict",
          redirect: null,
          perm: null,
          children: [
            {
              id: 79,
              parentId: 6,
              name: "字典新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict:add",
              children: [],
            },
            {
              id: 81,
              parentId: 6,
              name: "字典编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict_type:edit",
              children: [],
            },
            {
              id: 84,
              parentId: 6,
              name: "字典删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict_type:delete",
              children: [],
            },
          ],
        },
        {
          id: 135,
          parentId: 1,
          name: "字典数据",
          type: "MENU",
          routeName: "DictData",
          routePath: "dict-data",
          component: "system/dict/data",
          sort: 6,
          visible: 0,
          icon: "",
          redirect: null,
          perm: null,
          children: [
            {
              id: 136,
              parentId: 135,
              name: "字典数据新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 4,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict-data:add",
              children: [],
            },
            {
              id: 137,
              parentId: 135,
              name: "字典数据编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 5,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict-data:edit",
              children: [],
            },
            {
              id: 138,
              parentId: 135,
              name: "字典数据删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 6,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:dict-data:delete",
              children: [],
            },
          ],
        },
        {
          id: 117,
          parentId: 1,
          name: "系统日志",
          type: "MENU",
          routeName: "Log",
          routePath: "log",
          component: "system/log/index",
          sort: 6,
          visible: 1,
          icon: "document",
          redirect: null,
          perm: null,
          children: [],
        },
        {
          id: 120,
          parentId: 1,
          name: "系统配置",
          type: "MENU",
          routeName: "Config",
          routePath: "config",
          component: "system/config/index",
          sort: 7,
          visible: 1,
          icon: "setting",
          redirect: null,
          perm: null,
          children: [
            {
              id: 121,
              parentId: 120,
              name: "查询系统配置",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:config:query",
              children: [],
            },
            {
              id: 122,
              parentId: 120,
              name: "新增系统配置",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:config:add",
              children: [],
            },
            {
              id: 123,
              parentId: 120,
              name: "修改系统配置",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:config:update",
              children: [],
            },
            {
              id: 124,
              parentId: 120,
              name: "删除系统配置",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 4,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:config:delete",
              children: [],
            },
            {
              id: 125,
              parentId: 120,
              name: "刷新系统配置",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 5,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:config:refresh",
              children: [],
            },
          ],
        },
        {
          id: 126,
          parentId: 1,
          name: "通知公告",
          type: "MENU",
          routeName: "Notice",
          routePath: "notice",
          component: "system/notice/index",
          sort: 9,
          visible: 1,
          icon: "",
          redirect: null,
          perm: null,
          children: [
            {
              id: 127,
              parentId: 126,
              name: "查询",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:query",
              children: [],
            },
            {
              id: 128,
              parentId: 126,
              name: "新增",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 2,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:add",
              children: [],
            },
            {
              id: 129,
              parentId: 126,
              name: "编辑",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 3,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:edit",
              children: [],
            },
            {
              id: 130,
              parentId: 126,
              name: "删除",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 4,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:delete",
              children: [],
            },
            {
              id: 133,
              parentId: 126,
              name: "发布",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 5,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:publish",
              children: [],
            },
            {
              id: 134,
              parentId: 126,
              name: "撤回",
              type: "BUTTON",
              routeName: null,
              routePath: "",
              component: null,
              sort: 6,
              visible: 1,
              icon: "",
              redirect: null,
              perm: "sys:notice:revoke",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 118,
      parentId: 0,
      name: "系统工具",
      type: "CATALOG",
      routeName: null,
      routePath: "/codegen",
      component: "Layout",
      sort: 2,
      visible: 1,
      icon: "menu",
      redirect: null,
      perm: null,
      children: [
        {
          id: 119,
          parentId: 118,
          name: "代码生成",
          type: "MENU",
          routeName: "Codegen",
          routePath: "codegen",
          component: "codegen/index",
          sort: 1,
          visible: 1,
          icon: "code",
          redirect: null,
          perm: null,
          children: [],
        },
      ],
    },
    {
      id: 40,
      parentId: 0,
      name: "接口文档",
      type: "CATALOG",
      routeName: null,
      routePath: "/api",
      component: "Layout",
      sort: 7,
      visible: 1,
      icon: "api",
      redirect: "",
      perm: null,
      children: [
        {
          id: 41,
          parentId: 40,
          name: "Apifox",
          type: "MENU",
          routeName: null,
          routePath: "apifox",
          component: "demo/api/apifox",
          sort: 1,
          visible: 1,
          icon: "api",
          redirect: "",
          perm: null,
          children: [],
        },
      ],
    },
    {
      id: 26,
      parentId: 0,
      name: "平台文档",
      type: "CATALOG",
      routeName: null,
      routePath: "/doc",
      component: "Layout",
      sort: 8,
      visible: 1,
      icon: "document",
      redirect: "https://juejin.cn/post/7228990409909108793",
      perm: null,
      children: [
        {
          id: 102,
          parentId: 26,
          name: "平台文档(内嵌)",
          type: "EXTLINK",
          routeName: null,
          routePath: "internal-doc",
          component: "demo/internal-doc",
          sort: 1,
          visible: 1,
          icon: "document",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 30,
          parentId: 26,
          name: "平台文档(外链)",
          type: "EXTLINK",
          routeName: null,
          routePath: "https://juejin.cn/post/7228990409909108793",
          component: "",
          sort: 2,
          visible: 1,
          icon: "link",
          redirect: "",
          perm: null,
          children: [],
        },
      ],
    },
    {
      id: 20,
      parentId: 0,
      name: "多级菜单",
      type: "CATALOG",
      routeName: null,
      routePath: "/multi-level",
      component: "Layout",
      sort: 9,
      visible: 1,
      icon: "cascader",
      redirect: "",
      perm: null,
      children: [
        {
          id: 21,
          parentId: 20,
          name: "菜单一级",
          type: "MENU",
          routeName: null,
          routePath: "multi-level1",
          component: "demo/multi-level/level1",
          sort: 1,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [
            {
              id: 22,
              parentId: 21,
              name: "菜单二级",
              type: "MENU",
              routeName: null,
              routePath: "multi-level2",
              component: "demo/multi-level/children/level2",
              sort: 1,
              visible: 1,
              icon: "",
              redirect: null,
              perm: null,
              children: [
                {
                  id: 23,
                  parentId: 22,
                  name: "菜单三级-1",
                  type: "MENU",
                  routeName: null,
                  routePath: "multi-level3-1",
                  component: "demo/multi-level/children/children/level3-1",
                  sort: 1,
                  visible: 1,
                  icon: "",
                  redirect: "",
                  perm: null,
                  children: [],
                },
                {
                  id: 24,
                  parentId: 22,
                  name: "菜单三级-2",
                  type: "MENU",
                  routeName: null,
                  routePath: "multi-level3-2",
                  component: "demo/multi-level/children/children/level3-2",
                  sort: 2,
                  visible: 1,
                  icon: "",
                  redirect: "",
                  perm: null,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 36,
      parentId: 0,
      name: "组件封装",
      type: "CATALOG",
      routeName: null,
      routePath: "/component",
      component: "Layout",
      sort: 10,
      visible: 1,
      icon: "menu",
      redirect: "",
      perm: null,
      children: [
        {
          id: 108,
          parentId: 36,
          name: "增删改查",
          type: "MENU",
          routeName: null,
          routePath: "curd",
          component: "demo/curd/index",
          sort: 0,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 109,
          parentId: 36,
          name: "列表选择器",
          type: "MENU",
          routeName: null,
          routePath: "table-select",
          component: "demo/table-select/index",
          sort: 1,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 37,
          parentId: 36,
          name: "富文本编辑器",
          type: "MENU",
          routeName: null,
          routePath: "wang-editor",
          component: "demo/wang-editor",
          sort: 2,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 38,
          parentId: 36,
          name: "图片上传",
          type: "MENU",
          routeName: null,
          routePath: "upload",
          component: "demo/upload",
          sort: 3,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 95,
          parentId: 36,
          name: "字典组件",
          type: "MENU",
          routeName: null,
          routePath: "dict-demo",
          component: "demo/dict",
          sort: 4,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 39,
          parentId: 36,
          name: "图标选择器",
          type: "MENU",
          routeName: null,
          routePath: "icon-selector",
          component: "demo/icon-selector",
          sort: 4,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
      ],
    },
    {
      id: 110,
      parentId: 0,
      name: "路由参数",
      type: "CATALOG",
      routeName: null,
      routePath: "/route-param",
      component: "Layout",
      sort: 11,
      visible: 1,
      icon: "el-icon-ElementPlus",
      redirect: null,
      perm: null,
      children: [
        {
          id: 111,
          parentId: 110,
          name: "参数(type=1)",
          type: "MENU",
          routeName: null,
          routePath: "route-param-type1",
          component: "demo/route-param",
          sort: 1,
          visible: 1,
          icon: "el-icon-Star",
          redirect: null,
          perm: null,
          children: [],
        },
        {
          id: 112,
          parentId: 110,
          name: "参数(type=2)",
          type: "MENU",
          routeName: null,
          routePath: "route-param-type2",
          component: "demo/route-param",
          sort: 2,
          visible: 1,
          icon: "el-icon-StarFilled",
          redirect: null,
          perm: null,
          children: [],
        },
      ],
    },
    {
      id: 89,
      parentId: 0,
      name: "功能演示",
      type: "CATALOG",
      routeName: null,
      routePath: "/function",
      component: "Layout",
      sort: 12,
      visible: 1,
      icon: "menu",
      redirect: "",
      perm: null,
      children: [
        {
          id: 97,
          parentId: 89,
          name: "Icons",
          type: "MENU",
          routeName: null,
          routePath: "icon-demo",
          component: "demo/icons",
          sort: 2,
          visible: 1,
          icon: "el-icon-Notification",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 90,
          parentId: 89,
          name: "Websocket",
          type: "MENU",
          routeName: null,
          routePath: "/function/websocket",
          component: "demo/websocket",
          sort: 3,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
        {
          id: 91,
          parentId: 89,
          name: "敬请期待...",
          type: "CATALOG",
          routeName: null,
          routePath: "other/:id",
          component: "demo/other",
          sort: 4,
          visible: 1,
          icon: "",
          redirect: "",
          perm: null,
          children: [],
        },
      ],
    },
  ],

  "menus/:id/form": {
    id: 1,
    parentId: 0,
    name: "系统管理",
    type: "CATALOG",
    routeName: "",
    routePath: "/system",
    component: "Layout",
    perm: null,
    visible: 1,
    sort: 1,
    icon: "system",
    redirect: "/system/user",
    keepAlive: null,
    alwaysShow: null,
    params: null,
  },
};
