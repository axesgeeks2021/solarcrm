import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const fetchingOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (token) => {
    const response = await axios.get("http://solar365.co.in/get_order/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.data;
    return data;
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchingOrders.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchingOrders.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.data = action.payload);
    },
    [fetchingOrders.rejected]: (state, action) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export default OrderSlice;
