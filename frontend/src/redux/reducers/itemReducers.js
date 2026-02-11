import { createSlice } from "@reduxjs/toolkit";
import { createItem, getAllItems, getItemById } from "../actions/itemActions";

const initialState = {
  items: [],
  item: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
        state.message = "...loading...";
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.items = action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.item = action.payload;
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.message = "...loading...";
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "event created successfull";
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
