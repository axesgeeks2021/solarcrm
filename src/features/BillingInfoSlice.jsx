

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  data: [],
};

export const fetchInvoice = createAsyncThunk(
  "invoice/fetchInvoice",
  async (token) => {
    try {
      const res = await axios.get("http://solar365.co.in/invoice", {
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

const BillingInvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchInvoice.pending]: (state) => {
      (state.loading = true), (state.error = false), (state.isSuccess = false);
    },
    [fetchInvoice.fulfilled]: (state, { payload }) => {
      (state.loading = false),
        (state.error = false),
        (state.isSuccess = true),
        (state.data = payload);
    },
    [fetchInvoice.rejected]: (state) => {
      (state.loading = false), (state.error = true), (state.isSuccess = false);
    },
  },
});

export default BillingInvoiceSlice;
