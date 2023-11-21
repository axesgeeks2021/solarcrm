import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: false,
  loading: false,
  data: {},
  isSucess: false,
};

export const fetchLoginData = createAsyncThunk(
  "login/fetchLoginData",
  async (body) => {
    const res = await axios.post("http://13.126.231.119/api/login/", body, {
      withCredentials: true,
      credentials: "include",
    });
    const data = await res.data;
    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLoginData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLoginData.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.isSucess = true),
        (state.data = action.payload);
    },
    [fetchLoginData.rejected]: (state, action) => {
      (state.loading = false), (state.error = true), (state.isSucess = false);
    },
  },
});

export default loginSlice;
