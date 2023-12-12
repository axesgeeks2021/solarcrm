import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  data: {},
};

export const fetchDocumentWarranty = createAsyncThunk(
  "documentswarranty/fetchdocumentswarranty",
  async (token) => {
    try {
      const res = await axios.get("https://solar365.co.in/warranty/", {
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

const DocumentWarrantySlice = createSlice({
  name: "documentwarranty",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDocumentWarranty.pending]: (state) => {
      state.loading = true;
    },
    [fetchDocumentWarranty.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.isSuccess = true),
        (state.data = action.payload);
    },
    [fetchDocumentWarranty.rejected]: (state) => {
      (state.loading = false), (state.error = true), (state.isSuccess = false);
    },
  },
});

export default DocumentWarrantySlice;
