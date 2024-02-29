```
 ________  ___  ___  _______   _______  _________   
|\   ____\|\  \|\  \|\  ___ \ |\  ___ \|\___   ___\ 
\ \  \___|\ \  \\\  \ \   __/|\ \   __/\|___ \  \_| 
 \ \_____  \ \   __  \ \  \_|/_\ \  \_|/__  \ \  \  
  \|____|\  \ \  \ \  \ \  \_|\ \ \  \_|\ \  \ \  \ 
    ____\_\  \ \__\ \__\ \_______\ \_______\  \ \__\
   |\_________\|__|\|__|\|_______|\|_______|   \|__|
   \|_________|                                     
                                                    
```

## 简介

sheet-editor。通过参数传递api地址，以供不同的项目使用sheet表格。

## 使用技术
- [Luckysheet](https://mengshukeji.github.io/LuckysheetDocs/zh/) - 一款纯前端类似excel的在线表格库
- [Vite](https://www.vitejs.net/) - 构建工具
- [React](https://zh-hans.reactjs.org/) - 框架
- [React Router](https://reactrouter.com/docs/en/v6) - 路由
- [React Redux](https://react-redux.js.org/) - 状态管理
- [Redux Toolkit](https://redux-toolkit.js.org/) - 编写 Redux 逻辑的方法
- [Material UI](https://mui.com/zh/material-ui/getting-started/usage/) - ui 库

## 安装

```
yarn
```

## 启动服务

```
yarn dev
```

## 编译并发布

```
yarn deploy
```

## 使用
```javascript
/**
 * 获取第三方应用地址
 * @param nodeKey
 * @returns
 */
export const getThirdAppUrl = (
  nodeKey: string,
  cardKey: string,
  nodeType: Type,
  appUrl: string,
  editMode?: boolean
) => {
  const getDataApi = JSON.stringify({
    url: `${API_URL}/appendix/detail`,
    params: { nodeKey, cardKey, nodeType },
    docDataName: "content",
  });
  const patchDataApi = JSON.stringify({
    url: `${API_URL}/appendix/node`,
    params: { nodeKey, type: "doc" },
    docDataName: nodeType === "draw" ? ["content", "name"] : "content",
  });
  const getUptokenApi = JSON.stringify({
    url: "https://baokudata.qingtime.cn/sgbh/upTokenQiniu/getQiNiuUpToken",
    params: { token: "", type: 2 },
  });
  const token = localStorage.getItem("auth_token");
  // isEdit 2:编辑模式 1:只读 0:预览
  const query = `token=${token}&getDataApi=${encodeURIComponent(
    getDataApi
  )}&patchDataApi=${encodeURIComponent(
    patchDataApi
  )}&getUptokenApi=${encodeURIComponent(getUptokenApi)}&isEdit=${
    editMode ? 2 : 0
  }&hideHead=1`;
  return `${appUrl}?${query}`;
};
```
### 参数示例
```
http://localhost:3000/?token=7F81JOM45YE1QK4C9C2WEOODXJJIRT5MHMLH926QPD7AWQMM&getDataApi=%7B%22url%22%3A%22https%3A%2F%2Fnotesfoxx.qingtime.cn%2Fappendix%2Fdetail%22%2C%22params%22%3A%7B%22nodeKey%22%3A%225B1EC046%22%2C%22cardKey%22%3A%221423264751%22%2C%22nodeType%22%3A%22sheet%22%7D%2C%22docDataName%22%3A%22content%22%7D&patchDataApi=%7B%22url%22%3A%22https%3A%2F%2Fnotesfoxx.qingtime.cn%2Fappendix%2Fnode%22%2C%22params%22%3A%7B%22nodeKey%22%3A%225B1EC046%22%2C%22type%22%3A%22doc%22%7D%2C%22docDataName%22%3A%22content%22%7D&getUptokenApi=%7B%22url%22%3A%22https%3A%2F%2Fbaokudata.qingtime.cn%2Fsgbh%2FupTokenQiniu%2FgetQiNiuUpToken%22%2C%22params%22%3A%7B%22token%22%3A%22%22%2C%22type%22%3A2%7D%7D&isEdit=2&hideHead=1
```

