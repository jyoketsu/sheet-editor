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
    let luckysheetfile = luckysheet.getluckysheetfile();
    for (let index = 0; index < luckysheetfile.length; index++) {
      var sheet = luckysheetfile[index];
      if (sheet.data) {
        // @ts-ignore
        sheet["celldata"] = luckysheet.getGridData(sheet.data);
      }
    }
    dispatch(
      saveDoc({
        patchDataApi,
        data: {
          title: "",
          data: luckysheetfile,
        },
      })
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Sheet
        </Typography>
        <span style={{ flex: 1 }} />
        <Button variant="contained" onClick={handleSave}>
          {t("menu.save")}
        </Button>
      </Box>
      <Box
        id="luckysheet"
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      />
    </Box>
  );
}
