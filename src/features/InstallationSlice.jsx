import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  data: [], 
};

export const fetchInstallation = createAsyncThunk(
  "installation/fetchInstallation",
  async (token) => {
    try {
      const res = await axios.get("http://65.1.123.138:8000/install", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const InstallationSlice = createSlice({
  name: "install",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchInstallation.pending]: (state) => {
      (state.loading = true), (state.error = false), (state.isSuccess = false);
    },
    [fetchInstallation.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.isSuccess = true),
        (state.data = action.payload);
    },
    [fetchInstallation.rejected]: (state) => {
      (state.loading = false), (state.error = true), (state.isSuccess = false);
    },
  },
});

export default InstallationSlice;
