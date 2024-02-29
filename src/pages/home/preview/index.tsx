import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getSearchParamValue } from "../../../utils/util";
const BASE = import.meta.env.VITE_BASE;

export default function Editor() {
  const { t, i18n } = useTranslation();
  const docData = useAppSelector((state) => state.service.docData);
  const navigate = useNavigate();

  useEffect(() => {
    const isEdit = getSearchParamValue(location.search, "isEdit");
    if (isEdit === "2") {
      toEdit();
    }
  }, []);

  useEffect(() => {
    if (docData) {
      const data = JSON.parse(JSON.stringify(docData));
      const options = {
        container: "luckysheet", //luckysheet为容器id
        // title: "测试",
        lang: i18n.language.includes("zh") ? "zh" : i18n.language,
        allowCopy: false, // 是否允许拷贝
        showtoolbar: false, // 是否显示工具栏
        showinfobar: false, // 是否显示顶部信息栏
        // showsheetbar: false, // 是否显示底部sheet页按钮
        // showstatisticBar: false, // 是否显示底部计数栏
        // sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
        allowEdit: false, // 是否允许前台编辑
        enableAddRow: false, // 允许增加行
        enableAddCol: false, // 允许增加列
        userInfo: false, // 右上角的用户信息展示样式
        // showRowBar: false, // 是否显示行号区域
        // showColumnBar: false, // 是否显示列号区域
        sheetFormulaBar: false, // 是否显示公式栏
        // rowHeaderWidth: 0, //纵坐标
        // columnHeaderHeight: 0, //横坐标
        // showstatisticBarConfig: {
        //   count: false,
        //   view: false,
        //   zoom: false,
        // },
        showsheetbarConfig: {
          add: false, //新增sheet
          menu: false, //sheet管理菜单
          // sheet: false, //sheet页显示
        },
        forceCalculation: true, //强制计算公式
        data: data.data,
      };
      // @ts-ignore
      luckysheet.create(options);
    }
  }, [docData]);

  function toEdit() {
    navigate(`${BASE}editor${location.search}`);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        id="luckysheet"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <Button
        variant="contained"
        size="small"
        startIcon={<Edit />}
        sx={{
          position: "absolute",
          bottom: "75px",
          right: "25px",
          zIndex: 999,
        }}
        onClick={toEdit}
      >
        {t("menu.edit")}
      </Button>
    </div>
  );
}
