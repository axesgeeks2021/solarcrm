import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  data: {},
};

export const fetchGridConnection = createAsyncThunk(
  "grid/fetchGridConnection",
  async (token) => {
    try {
      const res = await axios.get("http://65.1.123.138:8000/grid_approval", {
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

const GridConnectionSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGridConnection.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchGridConnection.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.isSuccess = true),
        (state.data = action.payload);
    },
    [fetchGridConnection.rejected]: (state, action) => {
      (state.error = true), (state.loading = false), (state.isSuccess = false);
    },
  },
});

export default GridConnectionSlice;
