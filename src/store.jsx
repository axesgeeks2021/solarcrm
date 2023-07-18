import { configureStore } from "@reduxjs/toolkit";
import OrderSlice from "./features/OrderSlice";
import loginSlice from "./features/LoginSlice";
import DocumentSubmissionSlice from "./features/DocumentSubmissionSlice";
import GridConnectionSlice from "./features/GridConnectionSlice";
import InstallationSlice from "./features/InstallationSlice";
import DocumentWarrantySlice from "./features/DocumentsWarrantySlice";
import BillingInvoiceSlice from "./features/BillingInfoSlice";

export const store = configureStore({
  reducer: {
    order: OrderSlice.reducer,
    login: loginSlice.reducer,
    document: DocumentSubmissionSlice.reducer,
    grid: GridConnectionSlice.reducer,
    install: InstallationSlice.reducer,
    documentWarranty: DocumentWarrantySlice.reducer,
    invoice: BillingInvoiceSlice.reducer,

  },
});
