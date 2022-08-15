import {
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setDark } from "../../redux/reducer/commonSlice";
import { getSearchParamValue } from "../../utils/util";
import { getDoc, setApi } from "../../redux/reducer/serviceSlice";

export default function Home() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dark = useAppSelector((state) => state.common.dark);
  const getDataApi = useAppSelector((state) => state.service.getDataApi);
  const changed = useAppSelector((state) => state.service.changed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getSearchParamValue(location.search, "token");
    const getDataApiQuery = getSearchParamValue(location.search, "getDataApi");
    const patchDataApiQuery = getSearchParamValue(
      location.search,
      "patchDataApi"
    );
    const getUptokenApiQuery = getSearchParamValue(
      location.search,
      "getUptokenApi"
    );
    if (token && getDataApiQuery && patchDataApiQuery && getUptokenApiQuery) {
      const getDataApi = JSON.parse(decodeURIComponent(getDataApiQuery));
      const patchDataApi = JSON.parse(decodeURIComponent(patchDataApiQuery));
      const getUptokenApi = JSON.parse(decodeURIComponent(getUptokenApiQuery));
      dispatch(
        setApi({
          getDataApi,
          patchDataApi,
          getUptokenApi,
          token,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (getDataApi) {
      dispatch(getDoc(getDataApi));
    }
  }, [getDataApi]);

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const toggleMode = () => {
    dispatch(setDark(!dark));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Outlet />
    </Box>
  );
}
