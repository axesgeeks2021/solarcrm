import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  isSuccess: false,
  data: [],
};

export const fetchDocumnets = createAsyncThunk(
  "documents/fetchDocuments",
  async (token) => {
    try {
      const res = await axios.get("http://65.1.123.138:8000/upload_meter_docs/4/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await res.data;
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const DocumentSubmissionSlice = createSlice({
  name: "documentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDocumnets.pending]: (state, action) => {
      (state.loading = true), (state.error = false);
    },
    [fetchDocumnets.fulfilled]: (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.data = action.payload),
        (state.isSuccess = true);
    },
    [fetchDocumnets.rejected]: (state, action) => {
      (state.loading = false), (state.error = true), (state.isSuccess = false);
    },
  },
});

export default DocumentSubmissionSlice;
