import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface Api {
  url: string;
  params: object;
  responseName?: string;
  docDataName?: string;
}

interface SheetData {
  title: string;
  data?: object[];
}

interface ServiceState {
  getDataApi: Api | null;
  patchDataApi: Api | null;
  getUptokenApi: Api | null;
  docData: SheetData | null;
  changed: boolean;
}

const initialState: ServiceState = {
  getDataApi: null,
  patchDataApi: null,
  getUptokenApi: null,
  docData: null,
  changed: false,
};

export const getDoc = createAsyncThunk(
  "service/getDoc",
  async (getDataApi: Api) => {
    const res: any = await api.request.get(getDataApi.url, getDataApi.params);
    return res;
  }
);

export const saveDoc = createAsyncThunk(
  "service/saveDoc",
  async (params: { patchDataApi: Api; data: any }) => {
    const dataParam: any = {};
    dataParam[params.patchDataApi.docDataName || "detail"] = params.data;
    const res: any = await api.request.patch(params.patchDataApi.url, {
      ...params.patchDataApi.params,
      ...dataParam,
    });
    return res;
  }
);

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setApi: (
      state,
      action: PayloadAction<{
        getDataApi: Api;
        patchDataApi: Api;
        getUptokenApi: Api;
        token: string;
      }>
    ) => {
      state.getDataApi = action.payload.getDataApi;
      state.patchDataApi = action.payload.patchDataApi;
      state.getUptokenApi = action.payload.getUptokenApi;
      api.setToken(action.payload.token);
    },
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.changed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDoc.fulfilled, (state, action: PayloadAction<any>) => {
      const responseName = state.getDataApi?.responseName;
      const docDataName = state.getDataApi?.docDataName;
      const response = responseName
        ? action.payload[responseName]
        : action.payload.data;
      const data = docDataName ? response[docDataName] : response.detail;
      if (data) {
        state.docData = data;
      } else {
        state.docData = {
          title: "",
        };
      }
    });
    builder.addCase(saveDoc.fulfilled, (state, action: PayloadAction<any>) => {
      state.changed = false;
      if (action.payload.status === 200) {
        // alert("保存成功！");
      } else {
        alert(action.payload.msg);
      }
    });
  },
});

export const { setApi, setChanged } = serviceSlice.actions;

export default serviceSlice.reducer;
