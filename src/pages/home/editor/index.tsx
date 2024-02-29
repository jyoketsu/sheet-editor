import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLocation } from "react-router-dom";
import { getSearchParamValue } from "../../../utils/util";
import { saveDoc, setChanged } from "../../../redux/reducer/serviceSlice";

let timeout: NodeJS.Timeout;

export default function Editor() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const changed = useAppSelector((state) => state.service.changed);
  const docData = useAppSelector((state) => state.service.docData);
  const patchDataApi = useAppSelector((state) => state.service.patchDataApi);

  useEffect(() => {
    if (docData) {
      const data = JSON.parse(JSON.stringify(docData));
      const options = {
        container: "luckysheet", //luckysheet为容器id
        // title: "测试",
        lang: i18n.language.includes("zh") ? "zh" : i18n.language,
        allowEdit: true,
        forceCalculation: false,
        showinfobar: false,
        data: data.data,
        hook: {
          updated: function (operate: any) {
            handleChange();
          },
        },
      };
      // @ts-ignore
      luckysheet.create(options);
    }
  }, [docData]);

  const handleSave = () => {
    if (!patchDataApi) {
      return;
    }
    // @ts-ignore
    let allSheets = luckysheet.getAllSheets();
    dispatch(
      saveDoc({
        patchDataApi,
        data: {
          data: allSheets,
        },
      })
    );
  };

  const handleChange = () => {
    dispatch(setChanged(true));
    clearTimeout(timeout);
    dispatch(setChanged(true));
    timeout = setTimeout(() => {
      handleSave();
    }, 2000);
  };

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
      <div
        style={{
          position: "absolute",
          bottom: "3px",
          left: "15px",
          color: "#333333",
          fontSize: "14px",
        }}
      >
        {changed ? "有更改" : "已保存"}
      </div>
    </div>
  );
}
